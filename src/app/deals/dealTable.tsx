import { useState, useEffect } from 'react';

import { getData } from '../lib/googleData';
import { getColumnType, getForDay } from '../lib/util';
import { ColumnType } from '../lib/ColumnType';
import DealHeader from './dealHeader';
import DealRow from './dealRow';
import { DayOfWeekRange } from '../lib/util';

export default function DealTable({
  todayOnly,
}: Readonly<{ todayOnly?: boolean }>) {
  const [deals, setDeals] = useState<string[][] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData('Deals').then((dealsData) => {
      if (dealsData === undefined) return;
      setDeals(dealsData);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!deals || deals.length === 0) return <p>No deal data</p>;

  const headers: string[] = deals[0];
  const headerTypes: ColumnType[] = headers.map((header) =>
    getColumnType(header),
  );
  let dealRows: string[][] = deals.slice(1);

  if (todayOnly) {
    const dayIndex = headerTypes.findIndex(
      (header) => header === ColumnType.DAY_OF_WEEK,
    );
    const currentDay: DayOfWeekRange = new Date().getDay() as DayOfWeekRange;
    dealRows = getForDay(dealRows, dayIndex, currentDay);
  }

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
