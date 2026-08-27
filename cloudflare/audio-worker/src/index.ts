import catalog from '../../../site/app/data/catalog.json';
import unresolved from '../../../site/app/data/unresolved-recordings.json';

type CatalogEntry = { fileId?: string | null };
type Env = { AUDIO: R2Bucket };
type ByteRange = { offset: number; length: number };

const ALLOWED_ORIGINS = new Set([
  'https://mrhoosier23.github.io',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
]);

const ALLOWED_FILE_IDS = new Set<string>(
  [...(catalog as CatalogEntry[]), ...(unresolved as CatalogEntry[])]
    .map((item) => item.fileId)
    .filter((id): id is string => Boolean(id)),
);

function corsHeaders(request: Request) {
  const headers = new Headers();
  const origin = request.headers.get('Origin');
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Vary', 'Origin');
  }
  headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Range, If-None-Match, If-Modified-Since');
  headers.set('Access-Control-Expose-Headers', 'Accept-Ranges, Content-Length, Content-Range, ETag, X-Archive-Cache');
  headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
  return headers;
}

function withCors(request: Request, source?: Headers) {
  const headers = new Headers(source);
  const cors = corsHeaders(request);
  cors.forEach((value, key) => headers.set(key, value));
  return headers;
}

function parseRange(value: string | null, size: number): ByteRange | null | 'invalid' {
  if (!value) return null;
  if (!value.startsWith('bytes=') || value.includes(',')) return 'invalid';

  const match = /^bytes=(\d*)-(\d*)$/.exec(value.trim());
  if (!match) return 'invalid';

  const [, startText, endText] = match;
  if (!startText && !endText) return 'invalid';

  if (!startText) {
    const suffix = Number(endText);
    if (!Number.isFinite(suffix) || suffix <= 0) return 'invalid';
    const length = Math.min(suffix, size);
    return { offset: size - length, length };
  }

  const start = Number(startText);
  if (!Number.isFinite(start) || start < 0 || start >= size) return 'invalid';

  if (!endText) return { offset: start, length: size - start };

  const requestedEnd = Number(endText);
  if (!Number.isFinite(requestedEnd) || requestedEnd < start) return 'invalid';
  const end = Math.min(requestedEnd, size - 1);
  return { offset: start, length: end - start + 1 };
}

function applyObjectHeaders(headers: Headers, object: R2Object) {
  object.writeHttpMetadata(headers);
  headers.set('ETag', object.httpEtag);
  headers.set('Accept-Ranges', 'bytes');
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  headers.set('Content-Disposition', 'inline');
}

async function fetchDriveSource(fileId: string) {
  const encoded = encodeURIComponent(fileId);
  const candidates = [
    `https://drive.usercontent.google.com/download?id=${encoded}&export=download&confirm=t`,
    `https://docs.google.com/uc?export=download&id=${encoded}`,
  ];

  let lastStatus = 502;
  for (const url of candidates) {
    try {
      const response = await fetch(url, { redirect: 'follow' });
      lastStatus = response.status;
      const type = response.headers.get('content-type') || '';
      if (response.ok && response.body && !type.toLowerCase().includes('text/html')) return response;
    } catch {
      // Try the next Drive endpoint.
    }
  }

  throw new Error(`Drive fetch failed (${lastStatus}).`);
}

async function serveCached(request: Request, env: Env, key: string, head: R2Object) {
  const range = parseRange(request.headers.get('Range'), head.size);
  const headers = withCors(request);
  applyObjectHeaders(headers, head);
  headers.set('X-Archive-Cache', 'HIT');

  if (request.method === 'HEAD') {
    headers.set('Content-Length', String(head.size));
    return new Response(null, { status: 200, headers });
  }

  if (range === 'invalid') {
    headers.set('Content-Range', `bytes */${head.size}`);
    return new Response(null, { status: 416, headers });
  }

  const object = await env.AUDIO.get(key, range ? { range } : undefined);
  if (!object || !('body' in object)) return new Response('Audio object not found.', { status: 404, headers });

  if (range) {
    const end = range.offset + range.length - 1;
    headers.set('Content-Range', `bytes ${range.offset}-${end}/${head.size}`);
    headers.set('Content-Length', String(range.length));
    return new Response(object.body, { status: 206, headers });
  }

  headers.set('Content-Length', String(head.size));
  return new Response(object.body, { status: 200, headers });
}

async function importAndStream(request: Request, env: Env, ctx: ExecutionContext, fileId: string, key: string) {
  if (request.method === 'HEAD') {
    return new Response(null, { status: 404, headers: withCors(request) });
  }

  const source = await fetchDriveSource(fileId);
  if (!source.body) throw new Error('Drive returned an empty response.');

  const contentType = source.headers.get('content-type') || 'application/octet-stream';
  const contentLength = source.headers.get('content-length');
  const [forStorage, forClient] = source.body.tee();

  ctx.waitUntil(
    env.AUDIO.put(key, forStorage, {
      httpMetadata: {
        contentType,
        cacheControl: 'public, max-age=31536000, immutable',
        contentDisposition: 'inline',
      },
      customMetadata: { driveFileId: fileId },
    }),
  );

  const headers = withCors(request);
  headers.set('Content-Type', contentType);
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  headers.set('Content-Disposition', 'inline');
  headers.set('Accept-Ranges', 'bytes');
  headers.set('X-Archive-Cache', 'MISS');
  if (contentLength) headers.set('Content-Length', contentLength);

  // On a cache miss we intentionally return the full object as 200, even if
  // the browser asked for a Range. The same stream is written to R2 in the
  // background. All later requests, including seeks, are served as proper 206
  // byte ranges from R2.
  return new Response(forClient, { status: 200, headers });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const origin = request.headers.get('Origin');
    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return new Response('Origin not allowed.', { status: 403, headers: corsHeaders(request) });
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed.', {
        status: 405,
        headers: { Allow: 'GET, HEAD, OPTIONS' },
      });
    }

    const url = new URL(request.url);
    const match = /^\/audio\/([A-Za-z0-9_-]+)$/.exec(url.pathname);
    if (!match) return new Response('Not found.', { status: 404, headers: withCors(request) });

    const fileId = match[1];
    if (!ALLOWED_FILE_IDS.has(fileId)) {
      return new Response('Recording is not in the published archive.', { status: 404, headers: withCors(request) });
    }

    const key = `audio/${fileId}`;

    try {
      const head = await env.AUDIO.head(key);
      if (head) return serveCached(request, env, key, head);
      return await importAndStream(request, env, ctx, fileId, key);
    } catch (error) {
      console.error('Audio gateway error', { fileId, error });
      return new Response('Recording temporarily unavailable.', { status: 502, headers: withCors(request) });
    }
  },
};
