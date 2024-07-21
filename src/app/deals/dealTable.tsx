import { useState, useEffect } from 'react';

import { getData } from '../lib/googleData';
import {
  getColumnType,
  getDisplayColumns,
  getDisplayColumnsFilter,
  getForDay,
} from '../lib/util';
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
  const displayColumnsFilter = getDisplayColumnsFilter(headers);
  const headerTypes: ColumnType[] = headers.map((header) =>
    getColumnType(header),
  );
  const addressIndex = headerTypes.findIndex(
    (header) => header === ColumnType.ADDRESS,
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
    <div>
      <div className="text-4xl text-center mb-3" id="headline">
        Deals for {new Date().toLocaleString('en-us', { weekday: 'long' })}
      </div>
      <table
        className="table-auto border-solid border-2 border-slate-300"
        id="main-table"
      >
        <thead>
          <DealHeader
            headers={getDisplayColumns(headers, displayColumnsFilter)}
          />
        </thead>
        <tbody>
          {dealRows.map((deal: string[]) => {
            const d = getDisplayColumns(deal, displayColumnsFilter);
            // todo: better key algorithm
            return (
              <DealRow
                key={d.toString()}
                columns={d}
                addressIndex={displayColumnsFilter.indexOf(addressIndex)}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
