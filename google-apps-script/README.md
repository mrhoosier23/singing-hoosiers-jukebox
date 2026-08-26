# Free Google Drive submission backend

The GitHub Pages site is fully static. This optional Google Apps Script web app gives the archive form a free backend without Cloudflare, a database server, or paid storage.

## Already created

- Review folder: `Website Archive Submissions`
- Upload folder ID: `1dJNUBSuQzlzMK3Nw-YVqd1SBliPVhl3G`
- Review spreadsheet ID: `1N7mUJqdtym5UlkekTp6_ONE1ZcO99tT-zjH_su1remI`
- Notification address: `singinghoosiersalumnicouncil@gmail.com`

The spreadsheet has the review columns expected by `Code.gs`.

## One-time deployment

For best ownership and email continuity, do this while signed into the Singing Hoosiers Alumni Council Google account.

1. Open script.google.com and create a new project called `SHAC Archive Submission Backend`.
2. Replace the default code with the contents of `Code.gs`.
3. In Project Settings, enable the `appsscript.json` manifest and replace it with this folder's manifest if desired.
4. Click Deploy > New deployment > Web app.
5. Execute as: `Me`.
6. Who has access: `Anyone`.
7. Authorize Drive, Sheets, and Mail access.
8. Copy the deployed URL ending in `/exec`.
9. Paste that URL into `app/contribute/submission-config.ts` as `SUBMISSION_ENDPOINT`.
10. Commit and push. GitHub Pages will republish automatically.

Until step 9 is complete, the public form still works in free fallback mode by opening a pre-addressed email to the council Gmail account.

## Storage behavior

Direct website uploads are capped at 20 MB. Larger items should be put in Google Drive, Dropbox, Internet Archive, or another file service and submitted as a link. Uploaded files stay private inside the SHAC Drive review folder until alumni volunteers decide what should be published.
