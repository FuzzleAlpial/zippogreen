import { deleteProductByID, updateProduct } from "../../service";
import { useState, useEffect } from "react";

const RemoveProductModal = ({isOpen, onYes, onNo}) => {
    if (!isOpen) {
        return null;
    }
    return(
        <div className="modal-overlay" id="remove-modal-overlay">
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
  
export default function ProductUpdateModal({isOpen, onClose, props}){
    const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);

    const onNo = () => {
        setRemoveModalOpen(false);
    };
  
    const onYes = async() => {
        await deleteProductByID(props.id);
        setRemoveModalOpen(false);
        onClose();
    };
  
    const handleUpdateProduct = async(event) => {
        const productsName = document.forms["product-info"]["name"].value;
        const category = document.forms["product-info"]["category"].value;
        const stock = document.forms["product-info"]["stock"].value;
        const isBestseller = document.forms["product-info"]["isBestseller"].value;
        const description = document.forms["product-info"]["description"].value;
        const price = document.forms["product-info"]["price"].value;
        const image = document.forms["product-info"]["image"].value;
        const id = document.forms["product-info"]["id"].value
        if (!productsName || !category || !stock || !isBestseller || !description || !price || !image || !id){
            alert("Please complete all fields to update the product.");
            return;
        }
        event.preventDefault();

        await updateProduct({
            productsName,
            category,
            stock,
            isBestseller: isBestseller=== "1" ? 1 : null,
            description,
            price,
            image,
            id
        }).then(() => {
            alert("The product has been successfully updated.");
            onClose();
        })
    };

    const handleRemoveProduct = () => {
        setRemoveModalOpen(true);
    }

    if (!isOpen) {
        return null
    }
    
    return(
        <div className="modal-overlay">
            <div className="modal" id="product-control-modal">
                <div className="product-control-panel">                        
                    <form name="product-info" className="product-control-form">
                        <h2>Product information</h2>
                        <div id="product-control-flex">
                            <div>
                                <div>
                                    <label for="id" className="required">ID</label><br/>
                                    <input type="number" id="id" name="id" max="100" value={props.id} disabled required/><br/>
                                </div>
                                <div>
                                    <label for="name" className="required">Product name</label><br/>
                                    <input type="text" id="name" name="name" max="100" defaultValue={props.ProductsName} required/><br/>
                                </div>
                                <div>
                                    <label for="category" className="required">Category</label><br/>
                                    <input type="text" id="category" name="category" max="100" defaultValue={props.Category} required/><br/>
                                </div>
                                <div>
                                    <label for="isBestseller" className="required">Bestseller</label><br/>
                                    <select name="isBestseller" id="isBestseller" defaultValue={props.isBestseller}>
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label for="stock" className="required">Stock</label><br/>
                                    <input type="number" name="stock" id="stock" min="0" max="100" defaultValue={props.Stock} required/><br/>
                                </div>
                                <div>
                                    <label for="description" className="required">Description</label><br/>
                                    <textarea id="description" name="description" defaultValue={props.Description} required/><br/>
                                </div>
                                <div>
                                    <label for="price" className="required">Price</label><br/>
                                    <input type="number" id="price" name="price" min="0" defaultValue={props.Price} required/><br/>
                                </div>
                                <div>
                                    <label for="image" className="required">Image link</label><br/>
                                    <input type="text" id="image" name="image" defaultValue={props.Image} required/><br/>
                                </div><br/>
                            </div>
                        </div>
                        <button id="update-product-button" onClick={handleUpdateProduct}>Update</button>
                        <button id="remove-product-button" onClick={handleRemoveProduct}>Remove</button>
                    </form>
                    <button onClick={onClose} id="close-modal-button"><img src="../images/close-modal.png" alt="Close modal button" id="close-modal"/></button>
                </div>
                <RemoveProductModal isOpen={isRemoveModalOpen} onNo={onNo} onYes={onYes}/>
            </div>
        </div>
    )
}
