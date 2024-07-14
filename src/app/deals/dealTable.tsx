import { getData } from '../lib/googleData';
import { useState, useEffect } from 'react';
import DealHeader from './dealHeader';
import DealRow from './dealRow';

export default function DealTable() {
  const [deals, setDeals] = useState<string[][] | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getData('Deals').then((dealsData) => {
      if (dealsData === undefined) return;
      setDeals(dealsData);
      setLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!deals || deals.length === 0) return <p>No deal data</p>;

  const headers: string[] = deals[0];
  const dealRows: string[][] = deals.slice(1);

  return (
    <table className="dealTable">
      <thead>
        <DealHeader headers={headers} />
      </thead>
      <tbody>
        {dealRows.map((deal: string[]) => (
          // todo: better key algorithm
          <DealRow key={deal.toString()} columns={deal} />
        ))}
      </tbody>
    </table>
  );
}
