import {
  displayAddress,
  getColumnType,
  getDisplayColumns,
  getDisplayColumnsFilter,
  getForDay,
  mapAddress,
  scrubEmojis,
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

describe('getForDay', () => {
  it('should filter deals by day of week', () => {
    const deals = [
      ['1', 'Deal 1', 'Address 1'],
      ['2', 'Deal 2', 'Address 2'],
      ['1', 'Deal 3', 'Address 3'],
    ];

    const expected = [
      ['1', 'Deal 1', 'Address 1'],
      ['1', 'Deal 3', 'Address 3'],
    ];

    expect(getForDay(deals, 0, 1)).toEqual(expected);
  });

  it('returns empty array with no match', () => {
    const deals = [
      ['1', 'Deal 1', 'Address 1'],
      ['2', 'Deal 2', 'Address 2'],
      ['1', 'Deal 3', 'Address 3'],
    ];

    expect(getForDay(deals, 0, 3)).toEqual([]);
  });

  it('throws error when NaN', () => {
    const deals = [
      ['1', 'Deal 1', 'Address 1'],
      ['2', 'Deal 2', 'Address 2'],
      ['1', 'Deal 3', 'Address 3'],
    ];

    expect(() => getForDay(deals, 1, 1)).toThrow('Invalid day of week: Deal 1');
  });

  it('throws error when < 0', () => {
    const deals = [
      ['1', 'Deal 1', 'Address 1'],
      ['-1', 'Deal 2', 'Address 2'],
      ['1', 'Deal 3', 'Address 3'],
    ];

    expect(() => getForDay(deals, 0, 1)).toThrow('Invalid day of week: -1');
  });

  it('throws error when > 6', () => {
    const deals = [
      ['1', 'Deal 1', 'Address 1'],
      ['7', 'Deal 2', 'Address 2'],
      ['1', 'Deal 3', 'Address 3'],
    ];

    expect(() => getForDay(deals, 0, 1)).toThrow('Invalid day of week: 7');
  });
});

describe('getDisplayColumnsFilter', () => {
  it('should return indexes with 👁️ prefix', () => {
    const headers = ['PlaceID', 'Day🗓️', '👁️Deal', '👁️Address📍', '👁️Name'];

    expect(getDisplayColumnsFilter(headers)).toEqual([2, 3, 4]);
  });

  it('should return empty array when none displayed', () => {
    const headers = ['PlaceID', 'Day🗓️', 'Deal', 'Address📍', 'Name'];

    expect(getDisplayColumnsFilter(headers)).toEqual([]);
  });
});

describe('getDisplayColumns', () => {
  it('should return indexes with 👁️ prefix', () => {
    const headers = ['PlaceID', 'Day🗓️', '👁️Deal', '👁️Address📍', '👁️Name'];

    expect(getDisplayColumns(headers, [2, 3, 4])).toEqual([
      '👁️Deal',
      '👁️Address📍',
      '👁️Name',
    ]);
  });

  it('should return empty array when none displayed', () => {
    const headers = ['PlaceID', 'Day🗓️', 'Deal', 'Address📍', 'Name'];

    expect(getDisplayColumns(headers, [])).toEqual([]);
  });
});

describe('scrubEmojis', () => {
  it('should remove emoji from header', () => {
    expect(scrubEmojis('👁️Col🔑 Name🗓️📍')).toBe('Col Name');
  });

  it('should rertain emojiless header', () => {
    expect(scrubEmojis('Col Name')).toBe('Col Name');
  });

  it('should remove multiple of the same emoji', () => {
    expect(scrubEmojis('🗓️Col 🗓️Name🗓️')).toBe('Col Name');
  });
});
