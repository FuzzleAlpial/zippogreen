import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './general/homepage';
import Classics from './products/classics';
import Premium from './products/premium';
import Asia from './products/asia';
import Bestseller from './products/bestseller';
import Slim from './products/slim';
import Cart from './cart/cart';
import Payment from './payment/payment';
import LogIn from './user/login';
import ProductControl from './admin/product-control';
import OrderControl from './admin/order.control';
import Register from './user/register';

const App = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/classics" element={<Classics/>}/>
                <Route path="/premium" element={<Premium/>}/>
                <Route path="/asia" element={<Asia/>}/>
                <Route path="/bestseller" element={<Bestseller/>}/>
                <Route path="/slim" element={<Slim/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/payment" element={<Payment/>}/>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/product-control" element={<ProductControl/>}/>
                <Route path="/order-control" element={<OrderControl/>}/>
                <Route path="/register" element={<Register/>}/>

            </Routes>
        </Router>
)};

export default App;