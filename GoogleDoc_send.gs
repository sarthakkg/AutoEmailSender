// EDIT THE FOLLOWING EVERY TIME

var EMAIL_SUBJECT = 'Email Subject';
var EMAIL_TEMPLATE_DOC_URL = 'https://docs.google.com/document/d/543543354352345432543_u3245';
var STATUS_COLUMN = "C"; // updates Google sheet column to track if email has been sent

function sendEmail() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();

  // sets active sheet to "Unsubscribers"
  SpreadsheetApp.setActiveSheet(sheet.getSheets()[1]);

  // retrieves last filled in row in Google Sheet
  var lastRowU = sheet.getLastRow();
  var rangeU = "A2:A" + lastRowU;

  // retrieves array of all emails
  var dataRU = sheet.getRange(rangeU);
  var unsubscribers = dataRU.getValues();


  // sets active sheet to "Subscribers"
  SpreadsheetApp.setActiveSheet(sheet.getSheets()[0]);

  // retrieves last filled in row in Google Sheet
  var lastRow = sheet.getLastRow();
  var range = "A2:A" + lastRow;

  // retrieves array of all emails
  var dataR = sheet.getRange(range);
  var subscribers = dataR.getValues();

  for (var i in subscribers) {
    var row = subscribers[i];
    // var email = row[0];
    var email = row[0];
    var send = true;

    for (var j in unsubcribers) {
      var rowU = unsubcribers[j];
      var emailU = rowU[0];
      if (email == emailU) {
        send = false;
        break;
      }
    }
    if (send != false) {
      // console.log("Email: " + email);
      try {
        MailApp.sendEmail({
          to: email,
          subject: EMAIL_SUBJECT,
          htmlBody: createEmailBody(),
        });
        var cellNum = parseInt(i) + 2;
        var cell = STATUS_COLUMN + cellNum;

        sheet.getRange(cell).setValue("Sent");
      }
      catch (err) {
        console.log(err);
        let cellNum = parseInt(i) + 2;
        let cell = STATUS_COLUMN + cellNum;

        sheet.getRange(cell).setValue("Sent").setBackground('red');
      }
    }
    else {
      let cellNum = parseInt(i) + 2;
        let cell = STATUS_COLUMN + cellNum;

        sheet.getRange(cell).setValue("Unsubscribed").setBackground('orange');
    }
  }
}

// Creates email body from HTML file.
function createEmailBody() {
  // Make sure to update the emailTemplateDocId at the top.

  var docId = DocumentApp.openByUrl(EMAIL_TEMPLATE_DOC_URL).getId();
  var emailBody = docToHtml(docId);
  emailBody = emailBody.replace(/{{NAME}}/g, name);

  return emailBody;
}

// Downloads a Google Doc as an HTML string
function docToHtml(docId) {
  // Downloads a Google Doc as an HTML string.
  var url = "https://docs.google.com/feeds/download/documents/export/Export?id=" + docId + "&exportFormat=html";
  var param = {
    method: "get",
    headers: { "Authorization": "Bearer " + ScriptApp.getOAuthToken() },
    muteHttpExceptions: true,
  };
  return UrlFetchApp.fetch(url, param).getContentText();
}