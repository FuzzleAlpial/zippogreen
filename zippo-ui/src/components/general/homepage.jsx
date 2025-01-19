import { useEffect, useState } from "react";
import { getBestsellerProducts, getClassicsProducts, getPremiumProducts, getAsiaProducts, getSlimProducts } from "../../service";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Product from "../products/product";
import Modal from "../products/modal";
import NavBar from "./nav-bar";
import Footer from "./footer";

export default function HomePage() {
  const [bestsellerProducts, setBestsellerProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [classicsProducts, setClassicsProducts] = useState([]);
  const [premiumProducts, setPremiumProducts] = useState([]);
  const [asiaProducts, setAsiaProducts] = useState([]);
  const [slimProducts, setSlimProducts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const selectProduct = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#3E372B", borderRadius: "20px" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#3E372B", borderRadius: "20px" }}
        onClick={onClick}
      />
    );
  }
  
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  useEffect(() => {
    getBestsellerProducts().then((response) => {
      setBestsellerProducts(response);
    });
    getClassicsProducts().then((response) => {
      setClassicsProducts(response);
    });
    getPremiumProducts().then((response) => {
      setPremiumProducts(response);
    });
    getAsiaProducts().then((response) => {
      setAsiaProducts(response);
    });
    getSlimProducts().then((response) => {
      setSlimProducts(response);
    });
  }, []);

  return (
    <body>
      <header>
        <NavBar/>
      </header>
      <main>
        <div className="benefits-menu">
          <div className="benefits">
            <img src="./images/delivery.png" />
            <h3>Nationwide delivery</h3>
            <p>Pay after checking your delivery</p>
          </div>

          <div className="benefits">
            <img src="./images/return.png" />
            <h3>Quick return</h3>
            <p>Exchange and return within 7 days</p>
          </div>

          <div className="benefits">
            <img src="./images/payment.png" />
            <h3>Payment methods</h3>
            <p>Cash, bank transfer</p>
          </div>

          <div className="benefits">
            <img src="./images/buy-online.png" />
            <h3>Online order</h3>
            <p>Call us at: <a href="tel:0931166686">093.116.6686</a></p>
          </div>
        </div>

        <div>
          <div className="best-seller-region">
            <h1>
              <a href="./bestseller">Bestseller Products</a>
            </h1>
              <Slider {...settings}>
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
            </Slider>

          </div>
          <div className="category-region">
              <h1>
                <a href="./classics">Zippo Classics</a>
              </h1>

            <Slider {...settings}>
              {classicsProducts.map((item) => {
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
            </Slider>
          </div>

          <div className="category-region">
            <h1>
              <a href="./premium">Zippo Premium</a>
            </h1>

            <Slider {...settings}>
              {premiumProducts.map((item) => {
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
            </Slider>
          </div>

          <div className="category-region">
            <h1>
              <a href="./asia">Zippo Asia</a>
            </h1>
            
            <Slider {...settings}>
              {asiaProducts.map((item) => {
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
            </Slider>
          </div>

          <div className="category-region">
            <h1>
              <a href="./slim">Zippo Slim</a>
            </h1>

            <Slider {...settings}>
              {slimProducts.map((item) => {
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
            </Slider>
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
