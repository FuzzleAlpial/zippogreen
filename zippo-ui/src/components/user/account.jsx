import PaymentRow from "./payment/payment-row";
import NavBar from "../general/nav-bar";

const PastOrder = (props) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [productAmount, setProductAmount] = useState(0);
    const cart = JSON.parse(localStorage.getItem("cart"));

    useEffect(() => {
        let sum = 0;
        cart.forEach(item => {
            sum += item.quantity*item.price;
        });    
        setTotalPrice(sum);

        let amount = 0;
        cart.forEach((item) => {
        if (item.id === props.id) {
            amount += item.quantity * item.price;
        }});    
        setProductAmount(amount);

    }, [cart, props.id, props.quantity]);

    const closeModal = () => {
        setModalOpen(false);
      };    

    return(
        <table>
        <th colspan="3">
            <td>{props.time}</td>
        </th>
        <tr>
            <td><img src={props.image} alt="Zippo image" /></td>
            <td><p>{props.id} - {props.name} <b>×{props.quantity}</b></p></td>
            <td className="cart-product-price">{productAmount.toLocaleString()}đ</td>
        </tr>
        </table>
    )
}

const OrderModal = ({isOpen, onClose, props}) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let sum = 0;
        cart.forEach(item => {
            sum += item.quantity*item.price;
        });    
        setTotalPrice(sum);
    }, [cart]);

    return(
        <div className="modal-overlay">
            <div className="modal">
                <h2>Order details</h2>
                <ul>
                    <li>Order ID: {props.id}</li>
                    <li>Name: {props.receiverName}</li>
                    <li>Email: {props.receiverEmail}</li>
                    <li>Phone number: {props.receiverPN}</li>
                    <li>Address: {props.receiverAddress}</li>
                </ul>
                <h3>Products</h3>
                <table id="purchase-table">
                    {cart.map((item) => {
                        return (
                            <PaymentRow
                                id={item.id}
                                name={item.name}
                                quantity={item.quantity}
                            />
                        );
                        })}
                    <tr>
                        <td colspan="2">Total:</td>
                        <td>{totalPrice.toLocaleString()}đ</td>
                    </tr>
                </table>
                <button onClick={onClose} id="close-modal-button"><img src="../images/close-modal.png" alt="Close modal button" id="close-modal"/></button>
            </div>
        </div>
    )
}

export default function AccountInfo(props) {
    return(
        <body>
            <header>
                <NavBar/>
            </header>
            <main>
                <h1>Account information</h1>
                <hr/>
                <div>
                    <h2>Credentials</h2>
                    <p>Username: {props.username}</p>
                    <p>Password: {props.password}</p>
                    <button>Change password</button>
                </div>

                <h2>Order history</h2>
                <table> 
                    <tr>
                        <th colspan="3">Jan 14</th>
                    </tr>
                    <tr>
                        <td><img src="../images/48107.png" alt="Zippo image" /></td>
                        <td>48107 - Zippo Solid Copper <b>×1</b></td>
                        <td>700.000d</td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <button>View all products</button>
                        </td>
                        <td>Total: 700.000d</td>
                    </tr>
                </table>
                <hr/>
            </main>
        </body>
    )
}