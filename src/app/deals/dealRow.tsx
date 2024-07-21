import { mapAddress, displayAddress } from '../lib/util';

function formatAddressColumn(
  column: string,
  isAddress: boolean,
): string | JSX.Element {
  if (!isAddress) return column;

  return <a href={mapAddress(column)}>{displayAddress(column)}</a>;
}

export default function DealRow({
  columns,
  addressIndex,
}: {
  columns: string[];
  addressIndex: number;
}) {
  return (
    <tr className="dealRow">
      {columns.map((column: string, index: number) => (
        <td
          className="border-solid border-2 border-slate-300 px-2 py-1"
          key={column}
        >
          {formatAddressColumn(column, index === addressIndex)}
        </td>
      ))}
    </tr>
  );
}
