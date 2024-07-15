export default function DealHeader({
  headers,
  displayColumns,
}: {
  headers: string[];
  displayColumns: number[];
}) {
  return (
    <tr className="dealHeader">
      {headers.map((column: string) => {
        const index = headers.indexOf(column);
        if (displayColumns.includes(index)) {
          return <th key={column}>{column}</th>;
        }
      })}
    </tr>
  );
}
