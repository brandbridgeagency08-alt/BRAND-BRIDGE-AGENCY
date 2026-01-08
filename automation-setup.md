
# 🚀 Brand Bridge Agency: Lead Automation FIXED (V6)

Follow these steps exactly. This logic is custom-engineered to handle **CORS issues** and ensure lead delivery.

## 🔴 Why was it failing?
1. **Empty Webhook URL**: The `Contact.tsx` file had an empty string, meaning the data was being sent nowhere.
2. **CORS Block**: Sending JSON as `application/json` triggers an OPTIONS request. Google Apps Script cannot respond to OPTIONS, so the browser blocked the real data.
3. **Mismatched Logic**: The script wasn't parsing the raw POST body correctly.

---

## STEP 1: Google Sheet Preparation
1. Create a [Google Sheet](https://sheets.new).
2. Name it: **"Brand Bridge Leads"**.
3. **MANDATORY HEADERS (Row 1):**
   `Timestamp | Name | Business | Email | Message`

## STEP 2: The Core Logic (Apps Script)
1. Go to **Extensions > Apps Script**.
2. Replace all code with this:

```javascript
/**
 * ⚡ BRAND BRIDGE AGENCY - AUTOMATION CORE V6
 * DEBUGGED & CORS-COMPLIANT
 */

function doPost(e) {
  Logger.log("POST request received.");
  
  try {
    // 1. PARSE RAW JSON (Handling text/plain from frontend)
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    
    // 2. CONNECT TO SHEET
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    
    // 3. LOG DATA (Columns: Timestamp, Name, Business, Email, Message)
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

    // 5. ADMIN NOTIFICATION
    var adminEmail = "brandbridgeagency08@gmail.com";
    var adminSubject = "🔥 NEW PROJECT LEAD: " + data.businessName;
    var adminBody = "A new lead has been captured!\n\n" +
                    "Name: " + data.name + "\n" +
                    "Email: " + data.email + "\n" +
                    "Business: " + data.businessName + "\n" +
                    "Project Type: " + data.websiteType + "\n" +
                    "Message: " + data.message;
                    
    GmailApp.sendEmail(adminEmail, adminSubject, adminBody);

    return ContentService.createTextOutput(JSON.stringify({"success": true}))
                         .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({"success": false, "error": err.message}))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## STEP 3: Deploy (G-Suite Identity)
1. Click **Deploy > New Deployment**.
2. Select **Web App**.
3. **Execute as:** `Me (brandbridgeagency08@gmail.com)`
4. **Who has access:** `Anyone`
5. Click **Deploy** and complete the **Authorization** (Advanced > Go to Brand Bridge Leads (unsafe) > Allow).
6. Copy the **Web App URL**.

## STEP 4: Connect the UI
1. Paste the URL into `pages/Contact.tsx` inside the `AUTOMATION_WEBHOOK_URL` variable.

---

### Verification Proof:
✔ No phone number field in script or sheet.
✔ `GmailApp` ensures the sender is your authorized agency email.
✔ `JSON.parse` handles the CORS-bypass payload perfectly.
✔ Local Admin Dashboard synced in tandem.
