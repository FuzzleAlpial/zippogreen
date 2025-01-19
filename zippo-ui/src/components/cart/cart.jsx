import { useEffect, useState } from "react";
import CartRow from "./cart-row";
import NavBar from "../general/nav-bar";


export default function Cart(){
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
    const [totalPrice, setTotalPrice] = useState(0);
    const userID = localStorage.getItem("isLoggedIn");

    if (!userID){
        window.location.href = "./login";
    }

    const handleCheckOut = () => {
        window.location.href="./payment"
    }

    const handleBackToHomePage = () => {
        window.location.href="./"
    }

    useEffect(() => {
        console.log(cart);

        let sum = 0;
        cart.forEach(item => {
            sum += item.quantity*item.price;
        });    
        setTotalPrice(sum);
    }, [cart]);

    if (!cart || cart.length === 0){
        return(
            <body>
                <header>
                    <NavBar/>
                </header>
                <main>
                    <div id="empty-cart-div">
                        <img src="../images/empty-cart.png" alt="Empty cart" id="empty-cart-img"/>
                        <p>You have not added any products to your cart.</p>
                        <button onClick={handleBackToHomePage} id="back-to-homepage-button">← Back to Homepage</button>
                    </div>
                </main>
            </body>
        )
    }
    else{
        return userID && (
            <body>
                <header>
                    <NavBar/>
                </header>
                <main>
                    <div className="cart-nav">
                        <h1 className="cart-current">Cart</h1>
                        <i className="icon-angle-right" ></i>
                        <h1 className="cart-inactive">Payment details</h1>
                    </div>
                    <table>
                        <tr>
                            <th colspan="3">Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th></th>    
                        </tr>
                        {cart.map((item) => {
                        return (
                            <CartRow
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                            quantity={item.quantity}
                            stock={item.stock}
                            onRemove={setCart}
                            />
                        );
                        })}
                        <tr>
                            <td colspan="3">Total:</td>
                            <td>{totalPrice.toLocaleString()}đ</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                    <div className="cart-buttons">
                        <a href="./" id="browse-button">← Browse products</a>
                        <button id="checkout-button" onClick={handleCheckOut} disabled={!cart || cart.length === 0}>PROCEED TO CHECKOUT</button>    
                    </div>
                </main>
            </body>
        );
    }
}