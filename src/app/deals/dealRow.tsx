import { mapAddress, displayAddress } from '../lib/util';

export default function DealRow({ placeName, placeAddress, dealDesc }) {
  return (
    <tr className="dealRow">
      <td>{placeName}</td>
      <td>{dealDesc}</td>
      <td>
        <a href={mapAddress(placeAddress)}>{displayAddress(placeAddress)}</a>
      </td>
    </tr>
  );
}
