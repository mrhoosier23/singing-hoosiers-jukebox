const CONFIG = {
  notificationEmail: 'singinghoosiersalumnicouncil@gmail.com',
  spreadsheetId: '1N7mUJqdtym5UlkekTp6_ONE1ZcO99tT-zjH_su1remI',
  sheetName: 'Submissions',
  uploadFolderId: '1dJNUBSuQzlzMK3Nw-YVqd1SBliPVhl3G',
  maxUploadBytes: 20 * 1024 * 1024,
};

function doGet() {
  return ContentService.createTextOutput('Singing Hoosiers archive submission endpoint is active.');
}

function doPost(e) {
  try {
    const payload = parsePayload_(e);
    validate_(payload);

    const lock = LockService.getScriptLock();
    lock.waitLock(30000);

    let uploadedFileUrl = '';
    try {
      if (payload.fileBase64 && payload.fileName) {
        uploadedFileUrl = saveUpload_(payload);
      }

      const spreadsheet = SpreadsheetApp.openById(CONFIG.spreadsheetId);
      const sheet = spreadsheet.getSheetByName(CONFIG.sheetName);
      if (!sheet) throw new Error('Submission sheet not found.');

      sheet.appendRow([
        new Date(payload.createdAt || new Date().toISOString()),
        'Pending review',
        payload.submissionId || Utilities.getUuid(),
        payload.contributionType || '',
        payload.name || '',
        payload.email || '',
        payload.affiliation || '',
        payload.memberYears || '',
        payload.title || '',
        payload.recordingDate || '',
        payload.venue || '',
        payload.conductor || '',
        payload.performers || '',
        payload.notes || '',
        payload.credit || '',
        payload.externalUrl || '',
        uploadedFileUrl,
        payload.fileName || '',
        '',
      ]);
    } finally {
      lock.releaseLock();
    }

    notifyCouncil_(payload, uploadedFileUrl);
    return json_({ ok: true });
  } catch (error) {
    console.error(error);
    return json_({ ok: false, message: String(error && error.message ? error.message : error) });
  }
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) throw new Error('Empty submission.');
  return JSON.parse(e.postData.contents);
}

function validate_(payload) {
  if (!payload || typeof payload !== 'object') throw new Error('Invalid submission.');
  if (payload.website) throw new Error('Rejected.');
  if (!String(payload.name || '').trim()) throw new Error('Name is required.');
  if (!String(payload.email || '').trim()) throw new Error('Email is required.');
  if (!/^\S+@\S+\.\S+$/.test(String(payload.email))) throw new Error('Valid email is required.');
  if (!String(payload.title || '').trim()) throw new Error('Title or description is required.');
  if (payload.fileBase64) {
    const approximateBytes = Math.floor(String(payload.fileBase64).length * 0.75);
    if (approximateBytes > CONFIG.maxUploadBytes) throw new Error('File exceeds the 20 MB direct upload limit.');
  }
}

function saveUpload_(payload) {
  const bytes = Utilities.base64Decode(String(payload.fileBase64));
  if (bytes.length > CONFIG.maxUploadBytes) throw new Error('File exceeds the 20 MB direct upload limit.');
  const safeName = cleanFileName_(payload.fileName);
  const blob = Utilities.newBlob(bytes, payload.fileType || 'application/octet-stream', safeName);
  const folder = DriveApp.getFolderById(CONFIG.uploadFolderId);
  const file = folder.createFile(blob);
  return file.getUrl();
}

function cleanFileName_(name) {
  return String(name || 'archive-item')
    .replace(/[^a-zA-Z0-9._ -]+/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(-140) || 'archive-item';
}

function notifyCouncil_(payload, uploadedFileUrl) {
  const lines = [
    'A new Singing Hoosiers Alumni Archive contribution was submitted.',
    '',
    `Name: ${payload.name || ''}`,
    `Email: ${payload.email || ''}`,
    `Type: ${payload.contributionType || ''}`,
    `Title: ${payload.title || ''}`,
    `Years involved: ${payload.memberYears || ''}`,
    `Approximate date: ${payload.recordingDate || ''}`,
    `Venue / city: ${payload.venue || ''}`,
    `People pictured / heard: ${payload.performers || ''}`,
    `External link: ${payload.externalUrl || ''}`,
    `Uploaded file: ${uploadedFileUrl || ''}`,
    '',
    `Notes: ${payload.notes || ''}`,
    '',
    `Submission ID: ${payload.submissionId || ''}`,
    '',
    `Review sheet: https://docs.google.com/spreadsheets/d/${CONFIG.spreadsheetId}/edit`,
  ];

  MailApp.sendEmail({
    to: CONFIG.notificationEmail,
    subject: `Archive contribution: ${payload.title || payload.contributionType || 'New item'}`,
    body: lines.join('\n'),
    replyTo: payload.email || CONFIG.notificationEmail,
    name: 'Singing Hoosiers Alumni Archive',
  });
}

function json_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
