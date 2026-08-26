'use client';

import { FormEvent, useState } from 'react';
import { MAX_DIRECT_UPLOAD_BYTES, SUBMISSION_EMAIL, SUBMISSION_ENDPOINT } from './submission-config';

type FormState = 'idle' | 'sending' | 'success' | 'error';

type SubmissionPayload = {
  submissionId: string;
  createdAt: string;
  name: string;
  email: string;
  affiliation: string;
  memberYears: string;
  contributionType: string;
  title: string;
  recordingDate: string;
  venue: string;
  conductor: string;
  performers: string;
  notes: string;
  credit: string;
  externalUrl: string;
  fileName: string;
  fileType: string;
  fileBase64: string;
};

function value(form: FormData, key: string) {
  return String(form.get(key) || '').trim();
}

function readFileAsBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('The selected file could not be read.'));
    reader.onload = () => {
      const result = String(reader.result || '');
      resolve(result.includes(',') ? result.split(',', 2)[1] : result);
    };
    reader.readAsDataURL(file);
  });
}

function emailBody(payload: SubmissionPayload) {
  const rows = [
    ['Name', payload.name],
    ['Email', payload.email],
    ['Connection to Singing Hoosiers', payload.affiliation],
    ['Years involved', payload.memberYears],
    ['Contribution type', payload.contributionType],
    ['Title / description', payload.title],
    ['Approximate date / year', payload.recordingDate],
    ['Venue / city', payload.venue],
    ['Conductor / director', payload.conductor],
    ['People pictured / heard', payload.performers],
    ['Contributor credit', payload.credit],
    ['Online file link', payload.externalUrl],
    ['Selected file', payload.fileName],
    ['Notes / memory', payload.notes],
  ];
  return [
    'Singing Hoosiers Alumni Archive contribution',
    '',
    ...rows.flatMap(([label, entry]) => entry ? [`${label}: ${entry}`, ''] : []),
    payload.fileName ? 'Please attach the selected file to this email before sending.' : '',
  ].filter((line, index, arr) => line || (index > 0 && arr[index - 1] !== '')).join('\n');
}

export function ContributionForm() {
  const [state, setState] = useState<FormState>('idle');
  const [message, setMessage] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setState('sending');
    setMessage('');

    const selected = form.get('archiveFile');
    const file = selected instanceof File && selected.size > 0 ? selected : null;

    const payload: SubmissionPayload = {
      submissionId: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      name: value(form, 'name'),
      email: value(form, 'email'),
      affiliation: value(form, 'affiliation'),
      memberYears: value(form, 'memberYears'),
      contributionType: value(form, 'contributionType'),
      title: value(form, 'title'),
      recordingDate: value(form, 'recordingDate'),
      venue: value(form, 'venue'),
      conductor: value(form, 'conductor'),
      performers: value(form, 'performers'),
      notes: value(form, 'notes'),
      credit: value(form, 'credit'),
      externalUrl: value(form, 'externalUrl'),
      fileName: file?.name || '',
      fileType: file?.type || '',
      fileBase64: '',
    };

    try {
      if (SUBMISSION_ENDPOINT) {
        if (file && file.size > MAX_DIRECT_UPLOAD_BYTES) {
          throw new Error('For direct website upload, use a file under 20 MB or paste a Google Drive link instead.');
        }
        if (file) payload.fileBase64 = await readFileAsBase64(file);
        await fetch(SUBMISSION_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
          body: JSON.stringify(payload),
        });
        setState('success');
        setMessage('Thank you. Your contribution has been sent to the alumni archive review queue.');
        formElement.reset();
        return;
      }

      const subject = `Archive contribution: ${payload.title || payload.contributionType || 'Singing Hoosiers item'}`;
      const mailto = `mailto:${SUBMISSION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody(payload))}`;
      window.location.href = mailto;
      setState('success');
      setMessage(file ? 'Your email app is opening. Attach the selected file, then send the message.' : 'Your email app is opening with the archive details filled in. Send the message to complete your contribution.');
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'We could not prepare this contribution. Please try again.');
    }
  }

  return <form className="contribution-form" onSubmit={submit}>
    <div className="form-section"><span className="form-step">01 · About you</span><div className="form-grid"><label><span>Your name *</span><input name="name" required autoComplete="name"/></label><label><span>Email for follow-up *</span><input name="email" type="email" required autoComplete="email"/></label><label><span>Your connection to Singing Hoosiers</span><select name="affiliation" defaultValue="alumnus"><option value="Alumnus or alumna">Alumnus or alumna</option><option value="Current student">Current student</option><option value="Family or friend">Family or friend</option><option value="Former faculty or staff">Former faculty or staff</option><option value="Other">Other</option></select></label><label><span>Years you were involved</span><input name="memberYears" placeholder="Example: 1972 to 1975"/></label></div></div>
    <div className="form-section"><span className="form-step">02 · What are you sharing?</span><label><span>Contribution type *</span><select name="contributionType" required defaultValue="Audio recording"><option>Audio recording</option><option>Photograph</option><option>Newsletter, program, or document</option><option>Written story or memory</option><option>Historical correction or identification</option><option>Something else</option></select></label><label><span>Title or short description *</span><input name="title" required placeholder="Use the label on the tape or photograph if there is one"/></label><div className="form-grid"><label><span>Approximate date or year</span><input name="recordingDate" placeholder="Example: Spring 1974"/></label><label><span>Venue or city</span><input name="venue" placeholder="Example: Musical Arts Center"/></label><label><span>Conductor or director</span><input name="conductor"/></label><label><span>People pictured or heard</span><input name="performers"/></label></div><label><span>What do you remember about it?</span><textarea name="notes" rows={6} placeholder="Tell us about the concert, roadshow, people, source, or any detail that might help us identify and preserve it."/></label><label><span>How should the contributor credit appear?</span><input name="credit" placeholder="Example: Courtesy of Jane Doe, BS '75"/></label></div>
    <div className="form-section"><span className="form-step">03 · Add a file or link</span><label className="file-drop"><span>Choose a file from your device</span><input name="archiveFile" type="file" accept="audio/*,image/jpeg,image/png,image/webp,image/heic,image/heif,application/pdf,.doc,.docx"/><small>{SUBMISSION_ENDPOINT ? 'Direct uploads up to 20 MB. For larger files, use a Google Drive link.' : 'Your email app will open after you submit. Attach this file to the email before sending.'}</small></label><div className="or-line"><span>or</span></div><label><span>Link to a file already online</span><input name="externalUrl" type="url" placeholder="Google Drive, Dropbox, Internet Archive, or another link"/></label><p className="file-help">Sharing only a written memory or correction? You can leave both file fields blank and use the memory box above.</p></div>
    <div className="form-section checks"><label><input name="permission" type="checkbox" value="yes" required/><span>I own this material or have permission to share it with the Singing Hoosiers Alumni Archive for review. *</span></label><label><input name="accuracy" type="checkbox" value="yes" required/><span>The information above is accurate to the best of my knowledge. *</span></label></div>
    <button className="submit-recording" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Preparing your contribution…' : 'Submit for archive review'}</button>{message && <p className={`form-status ${state}`} role="status">{message}</p>}<p className="form-privacy">Your email is used only to follow up about this contribution. Everything is reviewed before publication. You can also email <a href={`mailto:${SUBMISSION_EMAIL}`}>{SUBMISSION_EMAIL}</a>.</p>
  </form>;
}
