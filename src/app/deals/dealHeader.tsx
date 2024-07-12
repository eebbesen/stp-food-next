export default function DealHeader({ headers }: { headers: string[] }) {
  return (
    <tr className="dealHeader">
      {headers.map((column: string) => (
        <th key={column}>{column}</th>
      ))}
    </tr>
  );
}
