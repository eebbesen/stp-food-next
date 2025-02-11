import { ColumnType } from './ColumnType';

const CITY_ALIASES = ['St. Paul', 'Saint Paul', 'St Paul'];

// convert address to Google Maps URL
export function mapAddress(address: string): string {
  return `https://www.google.com/maps/place/${encodeURIComponent(address)}`;
}

// remove city/state/zip from address
export function displayAddress(address: string): string {
  let ind = address.length;

  CITY_ALIASES.forEach((city) => {
    const newInd = address.lastIndexOf(city);
    if (newInd > -1) {
      ind = newInd;
    }
  });

  CITY_ALIASES.some((city) => {});

  let ret = address.substring(0, ind).trim();

  if (ret.lastIndexOf(',') === ret.length - 1) {
    ret = ret.substring(0, ret.length - 1);
  }

  return ret;
}

// extract column type from column name emoji
export function getColumnType(column: string): ColumnType {
  if (column.endsWith('📍')) {
    return ColumnType.ADDRESS;
  } else if (column.endsWith('🗓️')) {
    return ColumnType.DAY_OF_WEEK;
  } else if (column.endsWith('🔑')) {
    return ColumnType.KEY;
  }

  return ColumnType.NONE;
}

// get columns that will be displayed
export function getDisplayColumnsFilter(headers: string[]): number[] {
  return headers
    .map((header, index: number) => {
      if (header.startsWith('👁️')) {
        return index;
      }
    })
    .filter((column) => column !== undefined) as number[];
}

export function getDisplayColumns(
  columns: string[],
  indexes: number[],
): string[] {
  return indexes.map((index) => columns[index]);
}

export type DayOfWeekRange = 0 | 1 | 2 | 3 | 4 | 5 | 6;

// parse day of week from string, throw error if invalid
function parseDayOfWeek(input: string): DayOfWeekRange {
  const day = Number(input);
  if (isNaN(day) || day < 0 || day > 6) {
    throw new Error(`Invalid day of week: ${input}`);
  }

  return day as DayOfWeekRange;
}

// filter by day of week
export function getForDay(
  deals: string[][],
  dayIndex: number,
  dayValue: DayOfWeekRange,
): string[][] {
  return deals.filter((deal) => parseDayOfWeek(deal[dayIndex]) === dayValue);
}

export function scrubEmojis(text: string): string {
  return text.replace(/👁️|🔑|🗓️|📍/g, '');
}
