import DealRow from '../../../../src/app/deals/dealRow';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('DealRow', () => {
  it('renders a deal row', () => {
    render(
      <table>
        <tbody>
          <DealRow
            placeName="Test Place"
            placeAddress="123 Test St"
            dealDesc="Test Deal"
          />
        </tbody>
      </table>,
    );

    expect(screen.getByText('Test Place')).toBeInTheDocument();
    expect(screen.getByText('123 Test St')).toBeInTheDocument();
    expect(screen.getByText('Test Deal')).toBeInTheDocument();
  });
});
