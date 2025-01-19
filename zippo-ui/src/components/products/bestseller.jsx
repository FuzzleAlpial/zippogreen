import { useEffect, useState } from "react";
import { getBestsellerProducts, sortBestsellerProductsByPrice, sortBestsellerProductsByPriceDesc,sortBestsellerProductsByDefault } from "../../service";
// import { createAccount, searchProducts } from "../service/main";
import Product from "./product";
import Modal from "./modal";
import NavBar from "../general/nav-bar";
import Footer from "../general/footer";

export default function Bestseller() {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [bestsellerProducts, setBestsellerProducts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const selectProduct = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleSort = (event) => {
    if(event.target.value === "default")
      return sortBestsellerProductsByDefault().then((response) => {
        setBestsellerProducts(response); 
      });   
    if(event.target.value === "price-ascending")
      return sortBestsellerProductsByPrice().then((response) => {
        setBestsellerProducts(response); 
      });
    if(event.target.value === "price-descending")
      return sortBestsellerProductsByPriceDesc().then((response) => {
        setBestsellerProducts(response); 
      });
  };

  useEffect(() => {
    getBestsellerProducts().then((response) => {
      setBestsellerProducts(response); 
    });
  }, []);
    
  return (
    <body>
      <header>
        <NavBar/>
      </header>
      <main>
      <div className="category-region">
            <div className="category-header">
                <h1>Bestseller Products</h1>
                <div className="sort-div">
                    <label for="sort">Sort by:</label>
                    <select 
                      name="sort" 
                      id="sort"
                      onChange={(e) => handleSort(e)}
                    >
                        <option value="default">Default</option>
                        <option value="price-ascending">Price: Lowest to Highest</option>
                        <option value="price-descending">Price: Highest to Lowest</option>
                    </select>
                </div>    
            </div>
            <hr/>
            <div className="product-list">
              {bestsellerProducts.map((item) => {
                return (
                  <Product
                    id={item.id}
                    name={item.ProductsName}
                    price={item.Price}
                    image={item.Image}
                    onClick={() => {selectProduct(item)}}
                  />
                );
              })}
            </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} props={selectedProduct}/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </body>
  );   
}
