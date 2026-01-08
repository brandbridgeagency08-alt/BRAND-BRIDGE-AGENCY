/**
 * ⚡ BRAND BRIDGE AGENCY - AUTOMATION CORE V6.1
 * FULLY DEBUGGED & PRODUCTION SAFE
 */

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Empty POST body");
    }

    var data = JSON.parse(e.postData.contents);

    var name = data.name || "";
    var business = data.businessName || "";
    var email = data.email || "";
    var message = data.message || "";
    var websiteType = data.websiteType || "Not specified";

    // CONNECT TO SHEET
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // SAFE ROW APPEND
    sheet.appendRow([
      new Date(),        // ✅ FIXED
      name,
      business,
      email,
      message
    ]);

    // CLIENT AUTO-REPLY
    GmailApp.sendEmail(
      email,
      "Thanks for contacting Brand Bridge Agency",
      "Hi " + name + ",\n\n" +
      "Thanks for contacting Brand Bridge Agency.\n" +
      "We have received your request for " + business + " and will contact you shortly.\n\n" +
      "Best Regards,\n" +
      "Brand Bridge Agency Team",
      { name: "Brand Bridge Agency" }
    );

    // ADMIN EMAIL
    GmailApp.sendEmail(
      "brandbridgeagency08@gmail.com",
      "🔥 NEW PROJECT LEAD: " + business,
      "New Lead Details:\n\n" +
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Business: " + business + "\n" +
      "Website Type: " + websiteType + "\n" +
      "Message: " + message
    );

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log(err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * ✅ HEALTH CHECK (IMPORTANT)
 */
function doGet() {
  return ContentService
    .createTextOutput("Brand Bridge Automation is LIVE")
    .setMimeType(ContentService.MimeType.TEXT);
}
