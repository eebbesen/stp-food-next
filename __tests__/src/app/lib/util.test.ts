import { mapAddress, displayAddress } from '../../../../src/app/lib/util';

describe('mapAddress', () => {
  it('should convert address to Google Maps URL', () => {
    const address = '1600 Grand Ave, Saint Paul, MN 55105';
    const expected =
      'https://www.google.com/maps/place/1600%20Grand%20Ave%2C%20Saint%20Paul%2C%20MN%2055105';

    expect(mapAddress(address)).toEqual(expected);
  });
});

describe('displayAddress', () => {
  it('should display street address only with Saint Paul', () => {
    const address = '1600 Grand Ave, Saint Paul, MN 55105';
    const expected = '1600 Grand Ave';

    expect(displayAddress(address)).toEqual(expected);
  });

  it('should display street address only with St. Paul', () => {
    const address = '1600 Grand Ave, St. Paul, MN 55105';
    const expected = '1600 Grand Ave';

    expect(displayAddress(address)).toEqual(expected);
  });

  it('should display original address without Saint Paul variant', () => {
    const address = '1600 Grand Ave, Minneapolis, MN 55105';
    const expected = '1600 Grand Ave, Minneapolis, MN 55105';

    expect(displayAddress(address)).toEqual(expected);
  });
});
