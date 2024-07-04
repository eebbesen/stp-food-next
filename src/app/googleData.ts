"use server"

const {google} = require('googleapis');

const scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

const auth = new google.auth.GoogleAuth({
  credentials:{
    client_email: process.env.GOOGLE_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    project_id: process.env.GOOGLE_PROJECT_ID},
  scopes: scopes,
});

const sheets = google.sheets({version: 'v4', auth: auth});


export async function getData() {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'A1:Z100',
  });

  console.log('RESPONSE', response.data.values);
  return await response.data;
}