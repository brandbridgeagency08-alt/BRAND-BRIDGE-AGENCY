
# Brand Bridge Agency Automation Setup

This website is designed for high conversion and instant automation. Follow these steps to connect the contact form to your actual business systems.

## 1. Google Sheets Integration
- Create a new Google Sheet.
- Open **Extensions > Apps Script**.
- Paste a simple script to handle POST requests and append a row to your sheet.
- Deploy the script as a **Web App** with access "Anyone".
- In the React code (`pages/Contact.tsx`), replace the mock `setTimeout` with a real `fetch` call to your Apps Script URL.

```javascript
// Google Apps Script Snippet
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(), data.name, data.businessName, data.email, data.phone, data.websiteType, data.budgetRange, data.message]);
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}
```

## 2. Instant Notifications (Email & WhatsApp)
- **Zapier / Make.com:** Connect a Webhook to Zapier.
- **Trigger:** Webhook received.
- **Action 1 (Gmail):** Send email to `brandbridgeagency08@gmail.com`.
- **Action 2 (WhatsApp):** Use the Twilio or WhatsApp Business API integration in Zapier to send an alert to `6350154327`.
- **Action 3 (Auto-Reply):** Send a personalized "Thank You" email to the client's email address.

## 3. Google Analytics Tracking
The website includes event handlers for form submissions and button clicks.
- Add your Tracking ID (`G-XXXXXXXXXX`) to `index.html`.
- Use `window.gtag('event', 'conversion', { ... })` inside the `handleSubmit` function in `Contact.tsx`.

## 4. Admin Dashboard
The provided Admin Dashboard currently uses `localStorage` for demo persistence. For a real production environment, replace the `LeadContext` logic with a backend service like **Supabase** or **Firebase** for secure, multi-user lead management.
