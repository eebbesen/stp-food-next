// from https://github.com/sophiekoonin/choirbot/blob/master/src/__mocks__/googleapis.ts
// see https://localghost.dev/blog/different-ways-to-mock-third-party-integrations-in-jest/

import { GoogleApis } from 'googleapis';
const googleapis = jest.createMockFromModule('googleapis') as GoogleApis;

let authInput;

export const google = {
  auth: {
    GoogleAuth: jest.fn((input) => {
      authInput = input;
    }),
    getCredentials: jest.fn(() => authInput),
  },
  sheets: jest.fn(() => ({
    spreadsheets: {
      values: {
        get: jest.fn((input) => {
          return {
            data: {
              values: [
                ['H1', 'H2'],
                ['a1', 'b1'],
                ['a2', 'b2'],
                ['range', input.range],
              ],
            },
          };
        }),
      },
    },
  })),
};

googleapis.google = google;
export default googleapis;
