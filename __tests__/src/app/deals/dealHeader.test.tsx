import DealHeader from '../../../../src/app/deals/dealHeader';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('DealHeader', () => {
  it('renders the deal header', () => {
    const address = '1600 Grand Ave, Saint Paul, MN 55105';
    render(
      <table>
        <thead>
          <DealHeader />
        </thead>
      </table>,
    );

    expect(screen.getByText('Place')).toBeInTheDocument();
    expect(screen.getByText('Deal')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
  });
});
