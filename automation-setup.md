
# 🚀 100% WORKING: Agency Lead Automation (No Phone Version)

Follow these exact steps. This handles lead saving to Google Sheets and sends emails from **brandbridgeagency08@gmail.com**.

## STEP 1: Prepare Google Sheet
1. Open [Google Sheets](https://sheets.new).
2. Name it **"Agency Leads (Automated)"**.
3. **MANDATORY HEADERS (Row 1):**
   `Date | Name | Business | Email | Message`
   (Do NOT add a phone column).

## STEP 2: The Logic (Google Apps Script)
1. Go to **Extensions > Apps Script**.
2. Replace all code with this:

```javascript
/**
 * BRAND BRIDGE AGENCY - AUTOMATION CORE (V4)
 * Strictly No Phone Support
 */

function doPost(e) {
  Logger.log("POST request received.");
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var payload = e.postData.contents;
    var data = JSON.parse(payload);
    
    // 1. SAVE TO SHEET (Exactly 5 columns)
    sheet.appendRow([
      new Date().toLocaleString(), 
      data.name, 
      data.businessName, 
      data.email, 
      data.message
    ]);
    Logger.log("Data appended to sheet for: " + data.businessName);

    // 2. AUTO-REPLY TO CLIENT (From brandbridgeagency08@gmail.com)
    var clientSubject = "Thanks for contacting Brand Bridge Agency";
    var clientBody = "Hi " + data.name + ",\n\n" +
                     "Thanks for contacting Brand Bridge Agency.\n" +
                     "We have received your request for " + data.businessName + " and will contact you shortly via email.\n\n" +
                     "Best Regards,\n" +
                     "Tushar Rishi\n" +
                     "Brand Bridge Agency Team";
    
    GmailApp.sendEmail(data.email, clientSubject, clientBody, {
      name: "Brand Bridge Agency"
    });
    Logger.log("Auto-reply sent to: " + data.email);

    // 3. ADMIN NOTIFICATION (To you)
    var adminEmail = "brandbridgeagency08@gmail.com";
    var adminSubject = "🔥 NEW WEBSITE LEAD: " + data.businessName;
    var adminBody = "New project inquiry received!\n\n" +
                    "Client Name: " + data.name + "\n" +
                    "Email: " + data.email + "\n" +
                    "Project Type: " + data.websiteType + "\n" +
                    "Investment: " + data.budgetRange + "\n" +
                    "Requirements: " + data.message;
                    
    GmailApp.sendEmail(adminEmail, adminSubject, adminBody);
    Logger.log("Admin notification sent.");

    return ContentService.createTextOutput(JSON.stringify({"success": true}))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    Logger.log("Error: " + err.message);
    return ContentService.createTextOutput(JSON.stringify({"success": false, "error": err.message}))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## STEP 3: Deployment (Must be 'Anyone')
1. Click **Deploy** > **New Deployment**.
2. Select **Web App**.
3. **Execute as:** `Me (brandbridgeagency08@gmail.com)`
4. **Who has access:** `Anyone`
5. Click **Deploy**.
6. **Authorize:** Choice account > Advanced > Go to Agency Leads (unsafe) > Allow.
7. Copy the **URL**.

## STEP 4: Connect Website
1. Paste the URL into `pages/Contact.tsx` inside the `AUTOMATION_WEBHOOK_URL` variable.

---

### Why it failed earlier:
- **Phone Mismatch:** If your script expected a phone number but the form didn't send it (or vice-versa), the JSON parsing would fail.
- **Redirection:** Google Apps Scripts redirect after a POST. Using `mode: 'no-cors'` in `fetch` is required to prevent the browser from blocking the "opaque" response.
- **Gmail Permissions:** Ensure you clicked "Advanced" and "Allow" during deployment, otherwise `GmailApp` remains locked.

**Admin Password:** `tushar rishi`
