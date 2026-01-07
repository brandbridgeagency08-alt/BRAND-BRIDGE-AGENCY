
# Brand Bridge Agency Automation Setup (v2)

This guide provides the logic for saving leads to Google Sheets and sending automatic messages to the client.

## 1. Google Sheets & Auto-Message Script
Use this updated Google Apps Script. It handles the lead saving AND sends the "Thank You" email automatically.

### Steps:
1. Create a Google Sheet.
2. Go to **Extensions > Apps Script**.
3. Paste the following code:

```javascript
/**
 * GOOGLE APPS SCRIPT FOR BRAND BRIDGE AGENCY
 * Handles: Sheet Saving + Client Auto-Reply + Admin Alert
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // 1. Save to Google Sheet
    sheet.appendRow([
      new Date(), 
      data.name, 
      data.businessName, 
      data.email, 
      data.phone, 
      data.websiteType, 
      data.budgetRange, 
      data.message
    ]);

    // 2. Auto-Reply to Client (Instant Email Message)
    var clientSubject = "Thanks for contacting Brand Bridge Agency!";
    var clientBody = "Hello " + data.name + ",\n\n" +
                     "We've received your inquiry for a " + data.websiteType + " for " + data.businessName + ".\n" +
                     "Our team is currently reviewing your requirements. We will reach out to you within the next 2 hours.\n\n" +
                     "Best Regards,\n" +
                     "Tushar Rishi\n" +
                     "Brand Bridge Agency";
    
    MailApp.sendEmail(data.email, clientSubject, clientBody);

    // 3. Instant Alert to You (Admin Notification)
    var adminEmail = "brandbridgeagency08@gmail.com";
    var adminSubject = "🔥 NEW LEAD: " + data.businessName;
    var adminBody = "New inquiry from " + data.name + " (" + data.phone + ")\n" +
                    "Budget: " + data.budgetRange + "\n" +
                    "Message: " + data.message;
                    
    MailApp.sendEmail(adminEmail, adminSubject, adminBody);

    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err.message).setMimeType(ContentService.MimeType.TEXT);
  }
}
```

4. Click **Deploy > New Deployment**.
5. Select **Web App**.
6. Execute as: **Me**.
7. Who has access: **Anyone**.
8. Copy the **Web App URL**.
9. Paste it into the `AUTOMATION_WEBHOOK_URL` variable in `pages/Contact.tsx`.

## 2. Advanced: WhatsApp / SMS Alerts
To get a WhatsApp or SMS alert to `6350154327`:
- Use **Zapier** or **Make.com**.
- Set the trigger to **Google Sheets (New Row)**.
- Set the action to **WhatsApp Business API** or **Twilio SMS**.
- Message format: `New Lead: {{Name}} from {{Business}}. Budget: {{Budget}}. View details in Admin Dashboard.`

## 3. Deployment
The website is now configured to trigger this script every time the form is submitted.

**Admin Credentials:**
- Password: `tushar rishi`
