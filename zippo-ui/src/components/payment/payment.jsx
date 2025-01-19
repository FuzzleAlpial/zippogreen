import { useEffect, useState } from "react";
import { addOrder, addProductOrder, getOrderByID, updateProduct } from "../../service";
import NavBar from "../general/nav-bar";

const PaymentRow = (props) => {
    const [productAmount, setProductAmount] = useState(0);
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    useEffect(() => {
        let amount = 0;
        cart.forEach((item) => {
        if (item.id === props.id) {
            amount += item.quantity * item.price;
        }});    
        setProductAmount(amount);
    }, [cart, props.id, props.quantity]);

    return(
        <tr>
            <td colspan="2" className="cart-product-name">
                <p>{props.id} - {props.name} <b>×{props.quantity}</b></p>
            </td>
            <td className="cart-product-price">{productAmount.toLocaleString()}đ</td>
        </tr>
    )
}

const CompleteModal = ({isOpen, onClose, props}) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let sum = 0;
        cart?.forEach(item => {
            sum += item.quantity*item.price;
        });    
        setTotalPrice(sum);
    }, [cart]);

    if (!isOpen) {
        return null
    }
    
    return(
        <div className="modal-overlay">
            <div className="modal" id="payment-modal">
                <div>
                    <h2>Your order is received.</h2>
                    <table className="purchase-table">
                            <tr>
                                <th colspan="2">Product</th>
                                <th className="purchase-amount">Amount</th>
                            </tr>
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
                </div>
                <div id="purchase-details">
                    <ul>
                        <li>Order ID: {props.id}</li>
                        <li>Name: {props.receiverName}</li>
                        <li>Email: {props.receiverEmail}</li>
                        <li>Phone number: {props.receiverPN}</li>
                        <li>Address: {props.receiverAddress}</li>
                        <li><b>{document.forms["contact"]["bank-or-cod"].value==="1" ? "Please check your email for our banking information." : "Please remember to pay on delivery."}</b></li>
                    </ul>
                </div>
                <button onClick={onClose} id="close-modal-button"><img src="../images/close-modal.png" alt="Close modal button" id="close-modal"/></button>
            </div>
        </div>
    )
}

export default function Payment(){
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const [totalPrice, setTotalPrice] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);
    const [order, setOrder] = useState({});
    const [receiverName, setReceiverName] = useState("");
    const [receiverAddress, setReceiverAddress] = useState("");
    const [receiverPN, setReceiverPN] = useState("");
    const [receiverEmail, setReceiverEmail] = useState("");
    const time = new Date();    
    const [paymentMethod, setPaymentMethod] = useState(0);    
    const userID = localStorage.getItem("isLoggedIn");
    const accountID = parseInt(userID);

    if (!userID){
        window.location.href = "./login";
    }

    if (!cart || cart.length === 0){
        window.location.href="./"
    }
    
    const closeModal = () => {
        localStorage.removeItem("cart");
        setModalOpen(false);
        window.location.href = "./";
      };    

    useEffect(() => {
        let sum = 0;
        cart.forEach(item => {
            sum += item.quantity*item.price;
        });    
        setTotalPrice(sum);
    }, [cart]);

    const handleSubmit = async(event) => {
        event.preventDefault();

        const orderID = await addOrder({
            accountID,
            receiverName,
            receiverAddress,
            receiverPN,
            receiverEmail,
            time,
            paymentMethod,
        }).then((response) => {
            setReceiverName("");
            setReceiverAddress("");
            setReceiverPN("");
            setReceiverEmail("");
            setPaymentMethod("");

            return response.id;
        })
        
        await getOrderByID(orderID).then((response) => {
            setOrder(response[0])
        })

        // Extract productID and quantities from the cart
        cart.map(async (item) => {
            await addProductOrder({
                orderID: orderID,
                quantities: item.quantity,
                productID: item.id
            }).then((response) => {
                return response.id
            })

            await updateProduct({
                Stock: item.stock - item.quantity
            })
        }); 

        setModalOpen(true);
    }

    return(
        <body id="payment-body">
            <header>
                <NavBar/>
            </header>
            <main>
            <div className="cart-nav">
                    <h1 className="cart-inactive">Cart</h1>
                    <i className="icon-angle-right" ></i>
                    <h1 className="cart-current">Payment details</h1>
                </div>
                <div id="payment-div">
                    <div id="form-div">
                        <h2>Payment details</h2>
                        <form name="contact" id="payment-form">
                            <div>
                                <div>
                                    <label for="name" className="required">Your name</label><br/>
                                    <input type="text" id="name" name="name" max="100" onChange={e => setReceiverName(e.target.value)} required/><br/>
                                    <p id="name-warn" className="warn"></p>    
                                </div>
                                <div>
                                    <label for="email" className="required">Email</label><br/>
                                    <input type="email" name="email" id="email" max="100" onChange={e => setReceiverEmail(e.target.value)} required/><br/>
                                    <p id="email-warn" className="warn"></p>        
                                </div>
                            </div>
            
                            <div>
                                <div>
                                    <label for="phone" className="required">Phone number</label><br/>
                                    <input type="tel" id="phone" name="phone" onChange={e => setReceiverPN(e.target.value)}/>            
                                    <p id="phone-warn" className="warn"></p>        
                                </div>
                                <div>
                                    <label for="address" className="required">Address</label><br/>
                                    <input type="text" id="address" name="address" min="10" max="200" required onChange={e => setReceiverAddress(e.target.value)}/><br/>
                                    <p id="address-warn" className="warn"></p>        
                                </div>
                            </div>

                            <p className="required" id="payment-method">Payment method</p>
                            <input type="radio" id="bank-transfer" name="bank-or-cod" value="1" required onChange={e => setPaymentMethod(e.target.value)}/>
                            <label class="radio-label" for="bank-transfer">Bank transfer</label><br/>
                            <input type="radio" id="cod" name="bank-or-cod" value="2" onChange={e => setPaymentMethod(e.target.value)}/>
                            <label class="radio-label" for="cod">Cash on delivery</label><br/>    
                            <p id="payment-method-warn" className="warn"> </p>            

                            <input 
                            type="submit" 
                            value="Order" 
                            disabled={receiverName==="" || receiverAddress==="" || receiverEmail==="" || receiverPN==="" || paymentMethod===0}
                            onClick={handleSubmit}/>

                        </form>
                    </div>
                    <div id="purchase-order">
                        <h2>Purchase order</h2>
                        <table className="purchase-table">
                            <tr>
                                <th colspan="2">Product</th>
                                <th className="purchase-amount">Amount</th>
                            </tr>
                            {cart?.map((item) => {
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
                        </div>    
                    </div>
                    <CompleteModal isOpen={isModalOpen} onClose={closeModal} 
                    props={{
                            id: order.id,
                            receiverName: order.receiverName,
                            receiverAddress: order.receiverAddress,
                            receiverPN: order.receiverPN,
                            receiverEmail: order.receiverEmail,
                        }}/>
            </main>
        </body>
    );
}