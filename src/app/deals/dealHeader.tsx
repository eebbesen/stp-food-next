export default function DealHeader({ headers }: { headers: string[] }) {
  return (
    <tr className="bg-slate-50 text-black dealHeader">
      {headers.map((column: string) => (
        <th className="border-solid border-2 border-slate-300" key={column}>
          {column}
        </th>
      ))}
    </tr>
  );
}
