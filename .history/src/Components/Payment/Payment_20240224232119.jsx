import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import styles from "./Payment.module.css"; // Ensure this CSS module exists

const Payment = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);

  // State for form data
  const [formData, setFormData] = useState({
    fullName: "",
    streetAddress: "",
    city: "",
    zipCode: "",
    email: "",
    paymentMethod: "CreditCard", // Default to CreditCard
    cardDetails: {
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvc: "",
    },
  });

  useEffect(() => {
    if (location.state && location.state.items) {
      setCartItems(location.state.items);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (e.target.name in formData.cardDetails) {
      setFormData({
        ...formData,
        cardDetails: { ...formData.cardDetails, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      console.error("No user logged in");
      return;
    }
  
    // Get current date in ISO format
    const orderDate = new Date().toISOString();
  
    const orderData = {
      id: currentUser.id.toString(),
      items: cartItems.map((item) => ({
        ...item, // Spread the existing item properties
        orderDate, // Append the orderDate to each item
      })),
    };
  
    try {
      const response = await axios.post("https://epicbazaar.onrender.com/orders", orderData);
      console.log("Order submission successful", response.data);
      navigate("/order-confirmation", { replace: true });
    } catch (error) {
      console.error("Order submission error:", error.response ? error.response.data : error.message);
    }
  };
  
    try {
      const response = await axios.post(
        "https://epicbazaar.onrender.com/orders",
        orderData
      );
      if (response.status === 200 || response.status === 201) {
        navigate("/order-confirmation", { replace: true });
      } else {
        console.error("Failed to submit order:", response.statusText);
      }
    } catch (error) {
      console.error("Order submission error:", error.message);
    }
  };

  return (
    <div className={styles.paymentFormContainer}>
      <form onSubmit={handleSubmit} className={styles.paymentForm}>
        <div className={styles.inputGroup}>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="streetAddress">Street Address</label>
          <input
            type="text"
            id="streetAddress"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="zipCode">Zip Code</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            required
          >
            <option value="CreditCard">Credit Card</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>

        {/* Card Details */}
        <div className={styles.cardDetails}>
          <div className={styles.inputGroup}>
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardDetails.cardNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="expiryMonth">Expiry Month</label>
            <input
              type="text"
              id="expiryMonth"
              name="expiryMonth"
              value={formData.cardDetails.expiryMonth}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="expiryYear">Expiry Year</label>
            <input
              type="text"
              id="expiryYear"
              name="expiryYear"
              value={formData.cardDetails.expiryYear}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="cvc">CVC</label>
            <input
              type="text"
              id="cvc"
              name="cvc"
              value={formData.cardDetails.cvc}
              maxLength="4"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default Payment;
