// Order.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import styles from "./Order.module.css"; // Ensure this CSS module exists for styling

const Order = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (currentUser && currentUser.email) {
          const response = await axios.get(
            `https://epicbazaar.onrender.com/orders?email=${encodeURIComponent(
              currentUser.email
            )}`
          );
          setOrders(response.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [currentUser]);

  // Function to format date from ISO string to DD/MM/YYYY
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, "0"); // Ensures two digits
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed, add 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className={styles.orderHistoryContainer}>
      <h2 style={{fontWeight: "bold", fontSize: "40px"}}>Order History</h2>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} className={styles.orderCard} >
            <h3 style={{fontWeight: "bold"}}>Order Date: {formatDate(order.orderDate)}</h3>
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
                    <strong><p>Category: {item.category}</p></strong>
                   <strong> <p>Price: ${item.price}</p></strong>
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
