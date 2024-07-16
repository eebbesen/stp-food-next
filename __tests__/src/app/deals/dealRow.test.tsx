import DealRow from '../../../../src/app/deals/dealRow';
import { mapAddress } from '../../../../src/app/lib/util';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('DealRow', () => {
  it('renders a deal row', () => {
    const address = '1600 Grand Ave, Saint Paul, MN 55105';
    render(
      <table>
        <tbody>
          <DealRow columns={['Test Place', address, 'Test Deal']} />
        </tbody>
      </table>,
    );

    expect(screen.getByText('Test Place')).toBeInTheDocument();
    expect(screen.getByText(address)).toBeInTheDocument();
    expect(screen.getByText('Test Deal')).toBeInTheDocument();
    // expect(screen.getByRole('link')).toHaveAttribute(
    //   'href',
    //   expect.stringContaining(mapAddress(address)),
    // );
  });
});
