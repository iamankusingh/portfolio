# Contact delivery

The frontend posts URL-encoded `name`, `email`, `company`, and `message` fields to the Google Apps Script web app. Company may be empty. It expects JSON `{ "success": true }` or `{ "result": "success" }` only after the spreadsheet write succeeds. Other responses, network failures, and the 30-second timeout retain the form values and report unconfirmed delivery; requests are not automatically retried.

## Configuration

Keep the existing `Web_app` and `Deployment_ID` keys in `.env`. `Web_app` takes precedence and must be the deployment URL ending in `/exec`; the deployment ID is a fallback. Vite exposes only the resolved endpoint as `import.meta.env.VITE_CONTACT_ENDPOINT`. This URL is public in the browser, not a secret credential. Restart the dev server after changes and provide the variables when building for production.

The existing Google deployment must accept visitors without Google sign-in and have permission to write to the target spreadsheet. Use execute-as-owner and access for Anyone when deploying a public portfolio form. The spreadsheet itself does not need to be public. Update the deployed version after script edits.

## Apps Script contract

If the existing script already accepts these field names and returns the expected JSON, retain it. Otherwise adapt it or use the following in the spreadsheet's Apps Script project. Set a `SPREADSHEET_ID` script property to the spreadsheet ID (not the deployment ID). This example writes to a dedicated `Contact` tab, creating it if absent, with columns Timestamp, Name, Email, Company, Message. It does not modify existing tabs.

```javascript
function doPost(e) {
  const lock = LockService.getScriptLock();
  let locked = false;
  try {
    const p = e && e.parameter ? e.parameter : {};
    const name = String(p.name || '').trim();
    const email = String(p.email || '').trim();
    const company = String(p.company || '').trim();
    const message = String(p.message || '').trim();
    if (!name || name.length > 120 || !email || email.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        company.length > 160 || !message || message.length > 5000) {
      return contactResponse(false);
    }

    lock.waitLock(10000);
    locked = true;
    const id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    const spreadsheet = SpreadsheetApp.openById(id);
    let sheet = spreadsheet.getSheetByName('Contact');
    if (!sheet) sheet = spreadsheet.insertSheet('Contact');
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Company', 'Message']);
    }
    // Store visitor text literally rather than as spreadsheet formulas.
    const literal = value => /^[=+@-]/.test(value) ? "'" + value : value;
    sheet.appendRow([new Date(), ...[name, email, company, message].map(literal)]);
    SpreadsheetApp.flush();
    return contactResponse(true);
  } catch (_) {
    return contactResponse(false);
  } finally {
    if (locked) lock.releaseLock();
  }
}

function contactResponse(success) {
  return ContentService.createTextOutput(JSON.stringify({ success }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Pending user verification

Run `pnpm.cmd lint` and `pnpm.cmd build`, restart `pnpm.cmd dev`, and submit one clearly labeled test message. Confirm one row with all four fields and a timestamp, then confirm success clears the form. Check invalid email, blank required fields, optional company, repeated clicks, and offline/failed requests. Inspect the spreadsheet before retrying an unconfirmed request: a write can succeed even if the response fails.

If the browser cannot read the response, inspect deployment access and the returned JSON/redirect in its Network panel. Do not change fetch to `no-cors` and claim success: an opaque response cannot confirm storage. Browser delivery and the existing deployed script's compatibility remain unverified.

References: [Apps Script web apps](https://developers.google.com/apps-script/guides/web), [Content Service and redirects](https://developers.google.com/apps-script/guides/content), [Sheet appendRow](https://developers.google.com/apps-script/reference/spreadsheet/sheet#appendrowrowcontents), [Vite environment variables](https://vite.dev/guide/env-and-mode).
