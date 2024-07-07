export default function DealRow({ placeName, placeAddress, dealDesc}) {
  return (
    <tr>
      <td>{placeName}</td>
      <td>{dealDesc}</td>
      <td>{placeAddress}</td>
    </tr>
  );
}
