
# 🚀 100% WORKING: Agency Lead Automation Guide

Follow these steps exactly. This ensures leads are saved in Google Sheets and emails are sent from **brandbridgeagency08@gmail.com**.

## STEP 1: Create your Google Sheet
1. Open [Google Sheets](https://sheets.new).
2. Name it **"Agency Leads"**.
3. (Optional) In row 1, add these headers:
   `Date | Name | Business | Email | Phone | Type | Budget | Message`

## STEP 2: Paste the Automation Script
1. In your Google Sheet, click **Extensions > Apps Script**.
2. Delete everything inside the editor.
3. Paste this code:

```javascript
/**
 * BRAND BRIDGE AGENCY - AUTOMATION CORE
 * Sender: brandbridgeagency08@gmail.com
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // 1. SAVE DATA TO SHEET
    sheet.appendRow([
      new Date().toLocaleString(), 
      data.name, 
      data.businessName, 
      data.email, 
      data.phone, 
      data.websiteType, 
      data.budgetRange, 
      data.message
    ]);

    // 2. AUTO-REPLY TO CLIENT (From brandbridgeagency08@gmail.com)
    var clientSubject = "Thanks for contacting Brand Bridge Agency";
    var clientBody = "Hi " + data.name + ",\n\n" +
                     "Thanks for contacting Brand Bridge Agency.\n" +
                     "We have received your request for " + data.businessName + " and will contact you shortly.\n\n" +
                     "Best Regards,\n" +
                     "Tushar Rishi\n" +
                     "Brand Bridge Agency Team";
    
    GmailApp.sendEmail(data.email, clientSubject, clientBody, {
      name: "Brand Bridge Agency"
    });

    // 3. ADMIN NOTIFICATION (To you)
    var adminEmail = "brandbridgeagency08@gmail.com";
    var adminSubject = "🔥 NEW LEAD: " + data.businessName;
    var adminBody = "New inquiry received!\n\n" +
                    "Name: " + data.name + "\n" +
                    "Phone: " + data.phone + "\n" +
                    "Email: " + data.email + "\n" +
                    "Project: " + data.websiteType + "\n" +
                    "Budget: " + data.budgetRange + "\n" +
                    "Message: " + data.message;
                    
    GmailApp.sendEmail(adminEmail, adminSubject, adminBody);

    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err.message).setMimeType(ContentService.MimeType.TEXT);
  }
}
```

## STEP 3: Deploy as Web App (CRITICAL)
1. Click **Deploy** (blue button) > **New Deployment**.
2. Click the ⚙️ Gear icon > **Web App**.
3. **Execute as:** `Me (brandbridgeagency08@gmail.com)`
4. **Who has access:** `Anyone` (This allows the website form to talk to it).
5. Click **Deploy**.
6. **Authorize Access:** You will see a popup.
   - Choose your Gmail account.
   - It will say "Google hasn't verified this app". Click **Advanced**.
   - Click **Go to Agency Leads (unsafe)** at the bottom.
   - Click **Allow**.
7. Copy the **Web App URL** (ends in `/exec`).

## STEP 4: Update Website Code
1. Go back to your website code.
2. Open `pages/Contact.tsx`.
3. Find `const AUTOMATION_WEBHOOK_URL = '';`
4. Paste your URL: `const AUTOMATION_WEBHOOK_URL = 'https://script.google.com/macros/s/xxxx/exec';`
5. Save and refresh your website.

---

### ✅ FINAL VALIDATION CHECKLIST
- [ ] Lead appears as a new row in your Google Sheet.
- [ ] You receive a notification email in your inbox.
- [ ] The "client" (test with another email) receives the auto-reply.
- [ ] Sent emails appear in your Gmail "Sent" folder.

**Password for Admin Dashboard:** `tushar rishi`
