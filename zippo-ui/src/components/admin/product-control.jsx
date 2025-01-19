import { useEffect, useState } from "react";
import { getProducts } from "../../service";
import AdminNavBar from "./admin-navbar";
import ProductUpdateModal from "./update-and-remove-modal";
import ProductAddModal from "./add-modal";

const ProductControlRow = (props) => {
    const handleClick = () => {
      if (props.onClick) {
        props.onClick()
      }
    }
  
    return(
        <tr className="product-control-row" onClick={handleClick}>
          <td>{props.id}</td>
          <td>{props.ProductsName}</td>
          <td>{props.Category}</td>
          <td>{props.isBestseller}</td>
          <td>{props.Stock}</td>
          <td>{props.Description}</td>
          <td>{props.Price.toLocaleString()}đ</td>
          <td>{props.Image}</td>
        </tr>
    )
  }

export default function ProductControl(){
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    
    const handleClick = () => {
        setAddModalOpen(true);
      }
  
    const closeModal = () => {
        getProducts().then((response) => {
            setProducts(response); 
        });
        setUpdateModalOpen(false);
        setAddModalOpen(false);
    };    

    const selectProduct = (product) => {
        setSelectedProduct(product);
        setUpdateModalOpen(true);
    };
    
    //useEffect: all functions prior to displaying the page
    useEffect(() => {
        const userID = localStorage.getItem("isLoggedIn");
        if (parseInt(userID) !== 12){
            alert("You do not have the authorization to access this page.");
            window.location.href="./";
            return;
        }
    
        getProducts().then((response) => {
            setProducts(response); 
        });
    }, []);
    
    return(
        <body>
            <header>
                <AdminNavBar/>
            </header>
            <main>
                <h1>Product control</h1>
                <button id="add-product-button" onClick={handleClick}>Add product</button>
                <div id="table-wrapper">
                    <div id="table-scroll">
                        <table id="product-control-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product name</th>
                                    <th>Category</th>
                                    <th>Bestseller</th>
                                    <th>Stock</th>
                                    <th id="description-control">Description</th>
                                    <th>Price</th>
                                    <th>Image link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((item) => {
                                    return (
                                        <ProductControlRow
                                        id={item.id}
                                        ProductsName={item.ProductsName}
                                        Category={item.Category}
                                        Price={item.Price}
                                        isBestseller={item.isBestseller}
                                        Stock={item.Stock}
                                        Description={item.Description}
                                        Image={item.Image}
                                        onClick={() => {selectProduct(item)}}
                                        />
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr className="control-table-hr"/>

                <ProductUpdateModal isOpen={isUpdateModalOpen} onClose={closeModal} props={selectedProduct}/>
                <ProductAddModal isOpen={isAddModalOpen} onClose={closeModal}/>
            </main>
        </body>
        
    )
}