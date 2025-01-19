export default function OrderControlRow(props) {
  
    return(
        <tr>
          <td>{props.id}</td>
          <td>{props.accountID}</td>
          <td>{props.receiverName}</td>
          <td>{props.receiverAddress}</td>
          <td>{props.receiverPN}</td>
          <td>{props.receiverEmail}</td>
          <td>{props.time}</td>
          <td>{props.paymentMethod}</td>
        </tr>
    )
  }