
# 🚀 Brand Bridge Agency: GUARANTEED Lead Automation (V5)

Follow these steps exactly. This configuration is tested to bypass CORS and ensure leads are saved to Google Sheets with instant emails from **brandbridgeagency08@gmail.com**.

## STEP 1: Google Sheet Preparation
1. Create a new [Google Sheet](https://sheets.new).
2. Name it: **"Brand Bridge Agency Leads"**.
3. **MANDATORY HEADERS (Row 1):**
   `Timestamp | Name | Business | Email | Message`
   *(Do NOT add any other columns like Phone).*

## STEP 2: The Logic (Apps Script)
1. In your sheet, click **Extensions > Apps Script**.
2. Delete all existing code and paste this:

```javascript
/**
 * ⚡ BRAND BRIDGE AGENCY - AUTOMATION CORE V5
 * STRICTLY NO PHONE - GUARANTEED DELIVERY
 */

function doPost(e) {
  Logger.log("Incoming POST detected.");
  
  try {
    // 1. PARSE DATA
    // We expect a JSON string sent as text/plain to bypass CORS Preflight
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    
    // 2. CONNECT TO SHEET
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    
    // 3. APPEND ROW (Exactly 5 columns: Timestamp, Name, Business, Email, Message)
    sheet.appendRow([
      new Date().toLocaleString(),
      data.name,
      data.businessName,
      data.email,
      data.message
    ]);
    
    // 4. CLIENT AUTO-REPLY (From brandbridgeagency08@gmail.com)
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

    // 5. ADMIN NOTIFICATION (To you)
    var adminEmail = "brandbridgeagency08@gmail.com";
    var adminSubject = "🔥 NEW LEAD: " + data.businessName;
    var adminBody = "New project inquiry received!\n\n" +
                    "Client Name: " + data.name + "\n" +
                    "Business: " + data.businessName + "\n" +
                    "Email: " + data.email + "\n" +
                    "Project Type: " + data.websiteType + "\n" +
                    "Investment: " + data.budgetRange + "\n" +
                    "Requirements: " + data.message;
                    
    GmailApp.sendEmail(adminEmail, adminSubject, adminBody);

    // Return JSON Success
    return ContentService.createTextOutput(JSON.stringify({"success": true}))
                         .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log("ERROR: " + err.message);
    return ContentService.createTextOutput(JSON.stringify({"success": false, "error": err.message}))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## STEP 3: Deployment (CRITICAL)
1. Click **Deploy** > **New Deployment**.
2. Select **Web App**.
3. **Execute as:** `Me (brandbridgeagency08@gmail.com)`
4. **Who has access:** `Anyone`
5. Click **Deploy**.
6. **Authorize:** Choice your account > Click **Advanced** > Click **Go to Brand Bridge (unsafe)** > **Allow**.
7. Copy the **Web App URL**.

## STEP 4: Connect to Website
1. Open `pages/Contact.tsx`.
2. Find `const AUTOMATION_WEBHOOK_URL = '';`.
3. Paste the URL inside the quotes.
4. Save and Deploy your website.

---

### Why this version works:
- **CORS Bypass**: We use `text/plain` on the frontend. This stops the browser from asking "permission" via an OPTIONS request.
- **Data Integrity**: The script parses the raw post data, ensuring no loss of content.
- **Identity**: Using `GmailApp` specifically ties the email to your authenticated account.

**Admin Portal Password:** `tushar rishi`
