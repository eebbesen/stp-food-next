import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';

import DealTable from '../../../../src/app/deals/dealTable';

const today = new Date().getDay();
const yesterday = today === 0 ? 6 : today - 1;
const tomorrow = today === 6 ? 0 : today + 1;

jest.mock('../../../../src/app/lib/googleData', () => ({
  getData: jest.fn((input) =>
    Promise.resolve([
      ['PlaceID🔑', 'Name', 'Day🗓️', 'Deal', 'Address📍'],
      [
        1,
        'Afro Deli',
        `${yesterday}`,
        'Gyro',
        '123 Main St, Saint Paul, MN 55101',
      ],
      [
        2,
        'Taco Taco',
        `${yesterday}`,
        'Taco',
        '234 Main St, Saint Paul, MN 55101',
      ],
      [
        1,
        'Afro Deli',
        `${today}`,
        'Wings',
        '123 Main St, Saint Paul, MN 55101',
      ],
      [
        3,
        'Pizza Pizza',
        `${today}`,
        'Pizza',
        '456 Main St, Saint Paul, MN 55101',
      ],
      [
        4,
        'Burger Burger',
        `${today}`,
        'Fries',
        '567 Main St, Saint Paul, MN 55101',
      ],
      [
        3,
        'Pizza Pizza',
        `${tomorrow}`,
        'Salad',
        '456 Main St, Saint Paul, MN 55101',
      ],
      [
        5,
        'Sushi Sushi',
        `${tomorrow}`,
        'Sushi',
        '678 Main St, Saint Paul, MN 55101',
      ],
    ]),
  ),
}));

describe('DealTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Loading by default', () => {
    render(<DealTable />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders a deal table with all days', async () => {
    render(<DealTable />);

    await waitFor(() => {
      expect(screen.getByText('Gyro')).toBeInTheDocument();
      expect(screen.getByText('Wings')).toBeInTheDocument();
      expect(screen.getByText('Pizza')).toBeInTheDocument();
      expect(screen.getByText('Fries')).toBeInTheDocument();
    });
  });

  it('renders a deal table with all days', async () => {
    render(<DealTable todayOnly={true} />);

    await waitFor(() => {
      expect(screen.queryByText('Gyro')).toBeNull();
      expect(screen.getByText('Wings')).toBeInTheDocument();
      expect(screen.getByText('Pizza')).toBeInTheDocument();
      expect(screen.getByText('Fries')).toBeInTheDocument();
    });
  });
});
