'use server';

const { google } = require('googleapis');

const places = 'Places';
const deals = 'Deals';
const log = 'Log';

const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    project_id: process.env.GOOGLE_PROJECT_ID,
  },
  scopes: scopes,
});
const sheets = google.sheets({ version: 'v4', auth: auth });

async function getData(sheet: string) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: sheet,
  });

  return await response.data.values;
}

export async function getPlaces() {
  return await getData(places);
}

export async function getDeals() {
  return await getData(deals);
}

export async function getLog() {
  return await getData(log);
}
