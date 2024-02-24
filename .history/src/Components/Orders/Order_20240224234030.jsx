import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import styles from "./Order.module.css"; // Make sure to create this CSS module for styling

const Order = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `https://epicbazaar.onrender.com/orders?email=${currentUser.email}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (currentUser && currentUser.email) {
      fetchOrders();
    }
  }, [currentUser]);

  return (
    <div className={styles.orderHistoryContainer}>
      <h2>Order History</h2>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} className={styles.orderCard}>
            <h3>Order Date: {new Date(order.date).toLocaleDateString()}</h3>
            <ul>
              {order.items.map((item, itemIndex) => (
                <li key={itemIndex} className={styles.orderItem}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.orderItemImage}
                  />
                  <div className={styles.orderItemDetails}>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <p>Category: {item.category}</p>
                    <p>Price: ${item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default Order;
