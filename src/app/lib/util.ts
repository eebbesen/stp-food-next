import { ColumnType } from './columnType';

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
