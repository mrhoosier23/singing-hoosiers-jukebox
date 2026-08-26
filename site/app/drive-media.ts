const audioGatewayBase = (process.env.NEXT_PUBLIC_AUDIO_GATEWAY_URL || '').trim().replace(/\/+$/, '');

export function archiveAudioUrl(fileId: string) {
  if (!audioGatewayBase) return null;
  return `${audioGatewayBase}/audio/${encodeURIComponent(fileId)}`;
}

export function driveAudioUrl(fileId: string) {
  // Download/open fallback only. Raw Drive files are not reliable as
  // cross-origin HTML audio sources on GitHub Pages.
  return `https://docs.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`;
}

export function drivePreviewUrl(fileId: string) {
  // Temporary fallback while the R2-backed audio gateway is not configured.
  return `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/preview`;
}

export function driveFileUrl(fileId: string) {
  return `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/view`;
}
