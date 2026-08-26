#!/usr/bin/env python3
"""One-time bootstrap from the validated SHAC source snapshot to GitHub Pages."""
from pathlib import Path
import base64
import io
import shutil
import sys
import tarfile

DELETE_PATHS = [
    '.openai/hosting.json', 'app/api', 'app/chatgpt-auth.ts', 'db',
    'drizzle.config.ts', 'env.d.ts', 'pnpm-lock.yaml', 'pnpm-workspace.yaml',
    'vite.config.ts', '.vinext', 'package-lock.json',
]


def remove_path(path: Path) -> None:
    if path.is_dir() and not path.is_symlink():
        shutil.rmtree(path, ignore_errors=True)
    elif path.exists() or path.is_symlink():
        path.unlink(missing_ok=True)


def safe_extract(archive: tarfile.TarFile, destination: Path) -> None:
    root = destination.resolve()
    for member in archive.getmembers():
        target = (destination / member.name).resolve()
        if target != root and root not in target.parents:
            raise RuntimeError(f'Unsafe overlay path: {member.name}')
    archive.extractall(destination)


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit('Usage: python3 migration.py <site-directory>')
    root = Path(sys.argv[1]).resolve()
    if not (root / 'package.json').exists():
        raise SystemExit(f'Expected source tree at {root}')

    for rel in DELETE_PATHS:
        remove_path(root / rel)

    here = Path(__file__).resolve().parent
    parts = sorted(here.glob('migration-overlay-*.b64'))
    if not parts:
        raise RuntimeError('Migration overlay files are missing.')
    encoded = ''.join(part.read_text().strip() for part in parts)
    payload = base64.b64decode(encoded)
    with tarfile.open(fileobj=io.BytesIO(payload), mode='r:gz') as archive:
        safe_extract(archive, root)

    print('Singing Hoosiers archive source migrated to the GitHub Pages configuration.')


if __name__ == '__main__':
    main()
