export default function ProductOrderRow(props) {
  
    return(
        <tr>
          <td>{props.orderID}</td>
          <td>{props.productID}</td>
          <td>{props.quantities}</td>
        </tr>
    )
  }