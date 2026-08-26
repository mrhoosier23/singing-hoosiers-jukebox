export function driveAudioUrl(fileId: string) {
  // Start at Drive's public download endpoint instead of hot-linking the
  // drive.usercontent host directly. The legacy GitHub Pages jukebox used
  // this route successfully, and Google can attach the current redirect /
  // resource information needed for browser media playback.
  return `https://docs.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`;
}

export function driveFileUrl(fileId: string) {
  return `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/view`;
}
