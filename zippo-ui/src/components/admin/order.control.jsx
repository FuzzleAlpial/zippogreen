import { useEffect, useState } from "react";
import { getOrders, getProductOrders } from "../../service";
import AdminNavBar from "./admin-navbar";
import OrderControlRow from "./order-control-row";
import ProductOrderRow from "./product-order-row";

export default function OrderControl(){
    const [orders, setOrders] = useState([]);
    const [productOrders, setProductOrders] = useState([]);
    
    useEffect(() => {
        const userID = localStorage.getItem("isLoggedIn");
        if (parseInt(userID) !== 12){
            alert("You do not have the authorization to access this page.");
            window.location.href="./";
            return;
        }

        getOrders().then((response) => {
            setOrders(response); 
    });
        getProductOrders().then((response) => {
            setProductOrders(response); 
    });
    }, []);
    
    return(
        <body>
            <header>
                <AdminNavBar/>
            </header>
            <main id="order-control">
                <h1>Order control</h1>
                <h2>Orders</h2>
                <div id="table-wrapper">
                    <div id="table-scroll">
                        <table id="product-control-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Account ID</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Phone number</th>
                                    <th>Email</th>
                                    <th>Time</th>
                                    <th>Payment method</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((item) => {
                                    return (
                                        <OrderControlRow
                                        id={item.id}
                                        accountID={item.accountID}
                                        receiverName={item.receiverName}
                                        receiverAddress={item.receiverAddress}
                                        receiverPN={item.receiverPN}
                                        receiverEmail={item.receiverEmail}
                                        time={item.time}
                                        paymentMethod={item.paymentMethod}
                                        />
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr className="control-table-hr"/>

                <h2>Products in orders</h2>
                <div id="table-wrapper">
                    <div id="table-scroll">
                        <table id="product-control-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Product ID</th>
                                    <th>Quantities</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productOrders.map((item) => {
                                    return (
                                        <ProductOrderRow
                                        orderID={item.orderID}
                                        productID={item.productID}
                                        quantities={item.quantities}
                                        />
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr className="control-table-hr"/>

            </main>
        </body>
        
    )
}