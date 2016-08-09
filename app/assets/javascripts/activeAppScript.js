/**
 * This is a backup of what's currently running in Google App Script attached to Sheets file.
 */

/**
 * Triggered when any cell is edited. Seems to need to be both called onEdit AND bound to the onEdit
 trigger to work properly. Also, is buggier when calling many smaller funcs, so all is wrapped up messily inside
 here so as to get this working for the time being.

 * @param {Object} event
 */
function onEdit(event) {
  var WWST_AUTHORIZATION_HEADER = '9423b908206e7365702e4a72d530c6723c711a18549952790fff10b7bf381ec7f89ee6a159bf9f8a073c823098557de7dcc9964440b1409d64752599c1f7581e';
  var WWST_POST_URL = 'https://www.wewillstopthis.com/api/add';
  var TRIGGER_COL_INDEX = 8;

  var sheet = SpreadsheetApp.getActiveSheet();
  var cell = sheet.getActiveCell();
  var activeCellIndex = cell.getColumn();

  // Only send values if the trigger col changes.
  if (activeCellIndex !== TRIGGER_COL_INDEX) {
    Logger.log('Returning, activeCellIndex is ' + activeCellIndex);
    return;
  }


  var data = sheet.getDataRange().getValues();

  // Subtract one from the row index to account for the header in data array.
  var adjustedRowIndex = cell.getRowIndex() - 1;
  var keys = [];
  var rowValues = {};

  // First grab the keys
  data[0].forEach(function(d) {
    keys.push(d.toLowerCase().replace(/ /g, '_'));
  });

  // Now, get the row we want, add the values
  data[adjustedRowIndex].forEach(function(value, index) {
    rowValues[keys[index]] = typeof value !== 'undefined' ? value : '';
  });

  // Build POST options and send.
  var options = {
    'method': 'POST',
    'payload': JSON.stringify(rowValues),
    'contentType': 'application/json',
    'headers': {
      'Authorization': WWST_AUTHORIZATION_HEADER,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
  UrlFetchApp.fetch(WWST_POST_URL, options);

  Logger.log(JSON.stringify(rowValues));
}
