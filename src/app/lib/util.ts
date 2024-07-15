import { ColumnType } from './ColumnType';

// convert address to Google Maps URL
export function mapAddress(address: string): string {
  return `https://www.google.com/maps/place/${encodeURIComponent(address)}`;
}

// remove city/state/zip from address
export function displayAddress(address: string): string {
  let ind = address.lastIndexOf('St. Paul');
  if (ind === -1) {
    ind = address.lastIndexOf('Saint Paul');
  }

  if (ind === -1) {
    return address;
  }

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

type DayOfWeekRange = 0 | 1 | 2 | 3 | 4 | 5 | 6;

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
