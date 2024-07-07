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
