/**
 * Google Apps Script — Stack rank submission webhook
 *
 * Setup:
 * 1. Create a new Google Sheet with a tab named "Responses".
 * 2. Add header row: Timestamp | Name | Rank 1 | Rank 2 | Rank 3 | Rank 4 | Rank 5 | Rank 6 | Rank 7 | Rank 8
 * 3. Extensions → Apps Script → paste this file → Save.
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the web app URL into index.html (GOOGLE_SCRIPT_URL).
 */

var SHEET_NAME = 'Responses';

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error('Sheet "' + SHEET_NAME + '" not found.');
    }

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
