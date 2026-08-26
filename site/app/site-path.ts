export const SITE_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function siteAsset(path: string) {
  if (!path.startsWith('/')) return path;
  return `${SITE_BASE_PATH}${path}`;
}
