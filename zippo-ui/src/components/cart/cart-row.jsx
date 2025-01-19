import { useState, useEffect } from "react";

const RemoveProductModal = ({isOpen, onYes, onNo}) => {
    if (!isOpen) {
        return null;
    }
    return(
        <div className="modal-overlay">
            <div className="remove-product-modal">
                <p>Do you want to remove this product?</p>
                <div>
                    <button onClick={onYes} id="onYes">Yes</button>
                    <button onClick={onNo} id="onNo">No</button>
                </div>
            </div>
        </div>
    )
}

export default function CartRow(props) {
    const [quantity, setQuantity] = useState(props.quantity);
    const [isModalOpen, setModalOpen] = useState(false);
    

    const onNo = () => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        let item = cart.find((item) => item.id === props.id);
        item.quantity = 1;
        setQuantity(1);
        localStorage.setItem("cart", JSON.stringify(cart));
        props.onRemove(cart);

        setModalOpen(false);
    };

    const onYes = () => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        let newCart = cart.filter((item) => item.id !== props.id);
        localStorage.setItem("cart", JSON.stringify(newCart));
        props.onRemove(newCart);
        setModalOpen(false);
    };

    const handleRemoveProduct = () => {
        setModalOpen(true);
    }

    const handleQuantityChange = (event) => {
        console.log(event.target.value);
        const value = parseInt(event.target.value);
        setQuantity(value);
        let cart = JSON.parse(localStorage.getItem("cart"));

        let item = cart.find((item) => item.id === props.id);
        
        if (item){
            item.quantity = value;
            localStorage.setItem("cart", JSON.stringify(cart));
            props.onRemove(cart);
        }    
    };
    
    return(
        <tr>
            <td className="cart-product-image">
                <img src={props.image}/>
            </td>
            <td colspan="2" className="cart-product-name">
                <p>{props.id} - {props.name}</p>
            </td>
            <td className="cart-product-price">{props.price ? props.price.toLocaleString() + "đ" : "N/A"}</td>
            <td>
                <input type="number" id="inputQuantitySelector" name="quantity" title="quantity" value={quantity} min="1" max={props.stock} step="1" onChange={handleQuantityChange}/>
            </td>
            <td><button id="remove-product-cart" onClick={handleRemoveProduct}><img src="./../images/close-modal.png" alt="Remove product" id="remove-product"/></button></td>
            <RemoveProductModal isOpen={isModalOpen} onNo={onNo} onYes={onYes}/>
        </tr>
    )
}