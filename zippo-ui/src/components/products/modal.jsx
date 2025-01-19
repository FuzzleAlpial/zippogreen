import { useState } from "react";

const Modal = ({isOpen, onClose, props}) => {
    const [quantity, setQuantity] = useState(1);
    
    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        setQuantity(value);
    };

    if (!isOpen) {
        return null;
    }

    const addToCart = () => {
        const userID = localStorage.getItem("isLoggedIn");
        if (userID){
            let cart = localStorage.getItem("cart");

            //Check whether cart is existed or not
            if (!cart){
                cart = []
            }
            else {
                cart = JSON.parse(cart); // Parse the stored string back to an array
            }
        
            //Check whether the item is in the cart or not
            let item = cart.find((item) => item.id === props.id);
            if (item){
                item.quantity += quantity;
            }
            else{
                cart.push({
                    id: props.id,
                    quantity: quantity,
                    name: props.ProductsName,
                    image: props.Image,
                    price: props.Price,
                    stock: props.Stock
                })
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Product successfully added.")
        }
        else{
            alert("You need to log in before adding a product to cart.");
            window.location.href = "./login"
        }
    };
    
    return (
        <div className="modal-overlay">
            <div className="modal">
                <img src={props.Image} alt="Product"/>                
                <div>
                    <h2>{props.id} - {props.ProductsName}</h2>
                    <p id="product-des">{props.Description}</p>
                    <p>Price: <b id="product-price">{props.Price.toLocaleString()}đ</b></p>
                    <p>Stock: {props.Stock}</p>
                    <div id="modal-quantity-div">
                        <span>Quantity: </span>
                        <input 
                            type="number" 
                            id="modal-quantity" 
                            name="quantity" 
                            title="quantity" 
                            defaultValue={quantity} 
                            min="1" max={props.stock} step="1" 
                            onChange={handleQuantityChange}/>
                    </div>
                    <button id="add-to-cart" onClick={addToCart} disabled={props.Stock === 0}>Add to cart</button>
                </div>
                <button onClick={onClose} id="close-modal-button"><img src="../images/close-modal.png" alt="Close modal button" id="close-modal"/></button>
            </div>
        </div>
    );
};

export default Modal;