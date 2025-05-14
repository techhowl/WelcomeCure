// This code needs to be deployed as a Google Apps Script Web App
// Follow these steps:
// 1. Go to https://script.google.com/
// 2. Create a new project
// 3. Paste this code
// 4. Deploy as a web app (accessible to anyone, even anonymous)
// 5. Copy the web app URL and paste it in the SCRIPT_URL variable in BookingForm.tsx

// Google Sheet URL - this should match the URL in your .env file
const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1rwMuKNnYME58Gx7nypFRlBBQ79TonHKHTJ41fo_fXRk/edit";

function doGet(e) {
  // When using ContentService, we can only set one header at a time
  var output = ContentService.createTextOutput(JSON.stringify({ 
    result: 'success', 
    data: e && e.parameter ? e.parameter : {} 
  }));
  output = output.setMimeType(ContentService.MimeType.JSON);
  
  // Return the output
  return output;
}

function doPost(e) {
  // Create output object
  var output = ContentService.createTextOutput();
  output = output.setMimeType(ContentService.MimeType.JSON);
  
  // Handle preflight OPTIONS request
  if (e.parameter && e.parameter.httpMethod === 'OPTIONS') {
    return output;
  }

  try {
    // Handle GET requests (for the iframe approach)
    if (e.parameter && Object.keys(e.parameter).length > 0) {
      console.log("Received GET request with parameters");
      
      try {
        var sheets = SpreadsheetApp.openByUrl(GOOGLE_SHEET_URL);
        var sheet = sheets.getSheetByName("Sheet1") || sheets.getSheets()[0];
        
        // If the sheet is empty, add headers
        if (sheet.getLastRow() === 0) {
          sheet.appendRow([
            "Timestamp", 
            "Full Name", 
            "Age", 
            "Email", 
            "Phone", 
            "Doctor Preference",
            "City", // Include City header
            "Problem"
          ]);
        }

        // Get the timestamp
        var timestamp = new Date().toISOString();

        // Append new row from URL parameters
        sheet.appendRow([
          timestamp,
          e.parameter.fullName || '',
          e.parameter.age || '',
          e.parameter.email || '',
          e.parameter.phone || '',
          e.parameter.doctorPreference || '',
          e.parameter.city || '', // Include City value
          e.parameter.problem || ''
        ]);
        
        console.log("Successfully added row from GET parameters");
        return HtmlService.createHtmlOutput("Success! Data has been recorded.");
      } catch (sheetError) {
        console.error("Error with GET request: " + sheetError.toString());
        return HtmlService.createHtmlOutput("Error: " + sheetError.toString());
      }
    }
    
    // Log the raw postData
    console.log("Raw postData: " + JSON.stringify(e.postData));
    
    // Parse the JSON data from the POST body
    var data;
    try {
      data = JSON.parse(e.postData.contents);
      console.log("Parsed data: " + JSON.stringify(data));
    } catch (parseError) {
      console.error("Error parsing JSON: " + parseError.toString());
      console.log("Content that failed to parse: " + e.postData.contents);
      return output.setContent(JSON.stringify({
        result: 'error',
        message: 'Failed to parse JSON: ' + parseError.toString()
      }));
    }
    
    // Access the spreadsheet by URL - Use the constant defined at the top
    try {
      var sheets = SpreadsheetApp.openByUrl(GOOGLE_SHEET_URL);
      var sheet = sheets.getSheetByName("Sheet1");
      if (!sheet) {
        console.error("Could not find sheet named 'Sheet1'");
        var allSheets = sheets.getSheets();
        console.log("Available sheets: " + allSheets.map(function(s) { return s.getName(); }).join(", "));
        sheet = allSheets[0];  // Fall back to first sheet
      }
    } catch (sheetError) {
      console.error("Error accessing spreadsheet: " + sheetError.toString());
      return output.setContent(JSON.stringify({
        result: 'error',
        message: 'Failed to access spreadsheet: ' + sheetError.toString()
      }));
    }

    // If the sheet is empty, add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", 
        "Full Name", 
        "Age", 
        "Email", 
        "Phone", 
        "Doctor Preference",
        "City", // Include City header 
        "Problem"
      ]);
    }

    // Get the timestamp
    var timestamp = new Date().toISOString();

    // Append new row with data from the POST request
    try {
      sheet.appendRow([
        timestamp,
        data.fullName || '',
        data.age || '',
        data.email || '',
        data.phone || '',
        data.doctorPreference || '',
        data.city || '', // Include City value
        data.problem || ''
      ]);
      console.log("Successfully appended row to sheet");
    } catch (appendError) {
      console.error("Error appending row: " + appendError.toString());
      return output.setContent(JSON.stringify({
        result: 'error',
        message: 'Failed to append data to sheet: ' + appendError.toString()
      }));
    }

    // Return success
    return output.setContent(JSON.stringify({
      result: 'success',
      message: 'Data successfully saved to Google Sheets'
    }));
      
  } catch (error) {
    // Log error
    console.error('General error: ' + error.toString());
    
    // Return error
    return output.setContent(JSON.stringify({
      result: 'error',
      message: 'Error processing request: ' + error.toString()
    }));
  }
}

// Function to handle CORS preflight request
function sendCorsResponse() {
  var output = ContentService.createTextOutput('');
  output = output.setMimeType(ContentService.MimeType.JSON);
  return output;
} 