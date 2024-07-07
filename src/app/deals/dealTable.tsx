import { getDeals } from '../googleData';
import { useState, useEffect } from 'react';
import DealHeader from './dealHeader';
import DealRow from './dealRow';

export default function DealTable() {
  const [deals, setDeals] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getDeals().then((dealsData) => {
      setDeals(dealsData);
      setLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!deals) return <p>No deal data</p>;

  return (
    <table className="dealTable">
      <DealHeader />
      {deals.map((deal) => (
        <DealRow
          key={deal[0]}
          placeName={deal[1]}
          placeAddress={deal[4]}
          dealDesc={deal[3]}
        />
      ))}
    </table>
  );
}
