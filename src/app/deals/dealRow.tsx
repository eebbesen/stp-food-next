import { mapAddress, displayAddress } from '../lib/util';

export default function DealRow({ columns }: { columns: string[] }) {
  return (
    <tr className="dealRow">
      {columns.map((column: string) => (
        <td
          className="border-solid border-2 border-slate-300 px-2 py-1"
          key={column}
        >
          {column}
        </td>
      ))}
      {/* <td>{placeName}</td>
      <td>{dealDesc}</td>
      <td>
        <a href={mapAddress(placeAddress)}>{displayAddress(placeAddress)}</a>
      </td> */}
    </tr>
  );
}
