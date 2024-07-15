import {
  mapAddress,
  displayAddress,
  getColumnType,
} from '../../../../src/app/lib/util';
import { ColumnType } from '../../../../src/app/lib/ColumnType';

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

describe('getColumnType', () => {
  it('should return ADDRESS for address column', () => {
    const column = 'Address📍';

    expect(getColumnType(column)).toBe(ColumnType.ADDRESS);
  });

  it('should return KEY for key column', () => {
    const column = 'PlaceID🔑';

    expect(getColumnType(column)).toBe(ColumnType.KEY);
  });

  it('should return DAY_OF_WEEK for address column', () => {
    const column = 'Deal Day🗓️';

    expect(getColumnType(column)).toBe(ColumnType.DAY_OF_WEEK);
  });

  it('should return NONE for untyped column', () => {
    const column = 'Deal Day';

    expect(getColumnType(column)).toBe(ColumnType.NONE);
  });
});
