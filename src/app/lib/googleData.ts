'use server';

// import { unstable_cache } from 'next/cache';
import { google } from 'googleapis';

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

async function getGoogleData(sheet: string) {
  const time = Date.now();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: sheet,
  });
  // console.log(response.data.values);
  console.log('INFO', 'getData call took', Date.now() - time, 'ms');
  return await response.data.values;
}

// getting `Error: Invariant: incrementalCache missing in unstable_cache`
//   when running tests with the following cache implementaiton
//
// const getCachedGoogleData = unstable_cache(
//   async (sheet: string) => getGoogleData(sheet),
//   [],
//   { revalidate: 60 },
// );

// export async function getData(sheet: string) {
// }

export async function getData(sheet: string) {
  return await getGoogleData(sheet);
  //   return await getCachedGoogleData(sheet);
}
