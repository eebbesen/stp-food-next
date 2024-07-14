
import { getData } from '../../../../src/app/lib/googleData';

import { google } from 'googleapis';
jest.mock('googleapis');

describe ('getData', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('calls google auth with expected arguments', async () => {
    const expectedAuthInput = {
      "credentials": {"client_email": "domain-service@domain.iam.gserviceaccount.com",
                      "private_key": "privateKey",
                      "project_id": "projectId"},
                      "scopes": ["https://www.googleapis.com/auth/spreadsheets.readonly"]}

    const data = await getData('TestDeals');
    expect(await google.auth.getCredentials()).toEqual(expectedAuthInput);
  });

  it('returns spreadsheet data', async () => {
    const expectedData = [['H1', 'H2'], ['a1', 'b1'], ['a2', 'b2'], ['range', 'TestDeals']];

    const data = await getData('TestDeals');

    expect(data).toEqual(expectedData);
  });
});
