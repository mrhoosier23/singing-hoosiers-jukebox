# Singing Hoosiers archive audio gateway

This Worker keeps the public website on GitHub Pages while serving playable audio from Cloudflare R2.

## Architecture

- Google Drive remains the master archive and source of original recordings.
- GitHub Pages remains the website host.
- `singing-hoosiers-audio` is a private R2 bucket containing web-serving copies of recordings.
- `singing-hoosiers-audio-gateway` is a Worker bound to that bucket.
- The Worker only accepts Drive file IDs already present in the published archive catalog.
- On the first request for a recording, the Worker fetches the public original from Drive, streams it to the listener, and stores the same stream in R2.
- Later requests and byte-range seeks are served from R2.

This means there is no manual bulk media migration required before launch. The bucket fills itself as recordings are actually played.

## Cloudflare resources

Bucket name:

`singing-hoosiers-audio`

Worker name:

`singing-hoosiers-audio-gateway`

The binding is configured in `wrangler.jsonc` as `AUDIO`.

## Deploy

The repository includes `.github/workflows/deploy-audio-worker.yml`.

It expects these GitHub Actions repository secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

The API token needs permission to deploy Workers and manage R2 for the target Cloudflare account.

Run **Deploy SHAC audio gateway** from GitHub Actions. The workflow creates the R2 bucket if it does not exist and deploys the Worker.

Wrangler prints the deployed `workers.dev` URL. Save that URL as this GitHub Actions repository variable:

`AUDIO_GATEWAY_URL`

The GitHub Pages build reads that variable as `NEXT_PUBLIC_AUDIO_GATEWAY_URL`. When the variable is absent, the site keeps the Google Drive iframe fallback. When it is present, the decade jukebox and Song Library use normal HTML audio again and the Drive iframe disappears.

## Security and cost controls

The Worker does not act as an open Google Drive proxy. It imports only file IDs in `site/app/data/catalog.json` or `site/app/data/unresolved-recordings.json`.

The R2 bucket remains private. Audio is exposed only through the Worker.

The Worker allows browser CORS requests from `https://mrhoosier23.github.io` plus local development origins.

Objects are stored with long-lived immutable cache metadata because Drive file IDs are stable archive identifiers.

## Google Drive stays authoritative

Do not delete or move the originals out of the SHAC Drive as part of this migration. R2 is the website delivery copy, not the preservation copy.
