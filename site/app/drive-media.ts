export function driveAudioUrl(fileId: string) {
  // Kept as a download/open fallback. Google Drive no longer reliably allows
  // its raw file URLs to be used as cross-origin <audio> sources.
  return `https://docs.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`;
}

export function drivePreviewUrl(fileId: string) {
  // Google's supported embeddable Drive player. This avoids the 403/CORS
  // failures that affect raw Drive files inside third-party HTML audio tags.
  return `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/preview`;
}

export function driveFileUrl(fileId: string) {
  return `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/view`;
}
