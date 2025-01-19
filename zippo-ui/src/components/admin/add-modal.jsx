import { useState } from "react";
import { addProduct } from "../../service";

export default function ProductAddModal({isOpen, onClose}){
    const [id, setID] = useState("");
    const [productsName, setProductsName] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [isBestseller, setIsBestseller] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

    const handleAddProduct = async() => {
        await addProduct({
            id,
            productsName,
            category,
            stock,
            isBestseller,
            description,
            price,
            image,
        }).then(() => {
            alert("The product has been successfully added.");
            
            setID("");
            setProductsName("");
            setCategory("");
            setStock("");
            setIsBestseller("");
            setDescription("");
            setPrice("");
            setImage("");

            onClose();
        }).catch(() => {
            alert("This product ID has been taken. Please try again with a new ID.");
        })
    };

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
                                    <input type="number" id="id" name="id" max="100" defaultValue={id} onChange={e => setID(e.target.value)} required/><br/>
                                </div>
                                <div>
                                    <label for="name" className="required">Product name</label><br/>
                                    <input type="text" id="name" name="name" max="100" defaultValue={productsName} onChange={e => setProductsName(e.target.value)} required/><br/>
                                </div>
                                <div>
                                    <label for="category" className="required">Category</label><br/>
                                    <input type="text" id="category" name="category" max="100" defaultValue={category} onChange={e => setCategory(e.target.value)} required/><br/>
                                </div>
                                <div>
                                    <label for="isBestseller" className="required">Bestseller</label><br/>
                                    <select name="isBestseller" id="isBestseller" defaultValue={isBestseller} required onChange={e => setIsBestseller(e.target.value==="1" ? 1 : null)}>
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label for="stock" className="required">Stock</label><br/>
                                    <input type="number" name="stock" id="stock" min="0" max="100" defaultValue={stock} onChange={e => setStock(e.target.value)} required/><br/>
                                </div>
                                <div>
                                    <label for="description" className="required">Description</label><br/>
                                    <textarea id="description" name="description" defaultValue={description} onChange={e => setDescription(e.target.value)} required/><br/>
                                </div>
                                <div>
                                    <label for="price" className="required">Price</label><br/>
                                    <input type="number" id="price" name="price" min="0" defaultValue={price} onChange={e => setPrice(e.target.value)} required/><br/>
                                </div>
                                <div>
                                    <label for="image" className="required">Image link</label><br/>
                                    <input type="text" id="image" name="image" defaultValue={image} onChange={e => setImage(e.target.value)} required/><br/>
                                </div><br/>
                            </div>
                        </div>
                    </form>
                    <button onClick={onClose} id="close-modal-button"><img src="../images/close-modal.png" alt="Close modal button" id="close-modal"/></button>
                    <button 
                    id="update-product-button" 
                    onClick={handleAddProduct} 
                    disabled={productsName==="" || category==="" || stock==="" || description==="" || price==="" || image===""}>
                        Add product
                    </button>
                </div>
            </div>
        </div>
    )
}
