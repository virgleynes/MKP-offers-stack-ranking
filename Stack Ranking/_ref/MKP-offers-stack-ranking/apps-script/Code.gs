var SPREADSHEET_ID = '10xYpZHTlGvGPoS0HWbU6UkHiJv_4oQGKa7biwWrZUM0';
var SHEET_NAME = 'Responses';

function getResponsesSheet_() {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error('Tab "' + SHEET_NAME + '" not found. Rename your sheet tab to exactly "Responses".');
  }
  return sheet;
}

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var sheet = getResponsesSheet_();
    var rankings = payload.rankings || [];
    var rankCells = [];

    for (var i = 1; i <= 8; i++) {
      var match = rankings.filter(function (item) {
        return item.rank === i;
      })[0];

      rankCells.push(match ? match.type : '');
    }

    sheet.appendRow([
      payload.timestamp || new Date().toISOString(),
      payload.name || '',
      rankCells[0],
      rankCells[1],
      rankCells[2],
      rankCells[3],
      rankCells[4],
      rankCells[5],
      rankCells[6],
      rankCells[7]
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Stack rank webhook is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
