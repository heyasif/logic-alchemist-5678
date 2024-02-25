import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import styles from "./Payment.module.css";

const Payment = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    streetAddress: "",
    city: "",
    zipCode: "",
    email: "",
    paymentMethod: "CreditCard",
    cardDetails: {
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvc: "",
    },
  });
  const [showAnimation, setShowAnimation] = useState(false);

  const animationProps = useSpring({
    opacity: showAnimation ? 1 : 0,
    transform: showAnimation ? "scale(1)" : "scale(0)",
    from: { opacity: 0, transform: "scale(0)" },
    config: { tension: 300, friction: 10 },
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
    if (!currentUser || !currentUser.email) {
      console.error("No user logged in");
      return;
    }

    const orderDate = new Date().toISOString();

    const orderData = {
      email: currentUser.email,
      orderDate,
      items: cartItems.map((item) => ({
        title: item.title,
        price: item.price.toString(),
        description: item.description,
        category: item.category,
        image: item.image,
      })),
    };

    try {
      const response = await axios.post(
        "https://epicbazaar.onrender.com/orders",
        orderData
      );
      if (response.status === 200 || response.status === 201) {
        setShowAnimation(true);
        setTimeout(() => {
          navigate("/orders", { replace: true });
        }, 2000); // Redirect after 2 seconds
      } else {
        console.error("Failed to submit order:", response.statusText);
      }
    } catch (error) {
      console.error(
        "Order submission error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div id="parent">
      <div id="addressImg">
        <img src="./address.png" alt="" />
      </div>
      <div className={styles.paymentFormContainer}>
        <form onSubmit={handleSubmit} className={styles.paymentForm}>
          <div className={styles.splitInput}>
            <div className={styles.inputGroup}>
              <label htmlFor="fullName">Full Name</label>
              <input
                placeholder="Enter your full name"
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
                placeholder="Enter your street address"
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className={styles.splitInput}>
            <div className={styles.inputGroup}>
              <label htmlFor="city">City</label>
              <input
                placeholder="Enter your city"
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
                placeholder="Enter your zip code"
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
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
                placeholder="Enter your card number"
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardDetails.cardNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.splitInput}>
              <div className={styles.inputGroup}>
                <label htmlFor="expiryMonth">Expiry Month</label>
                <input
                  placeholder="Enter your expiry month"
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
                  placeholder="Enter your expiry year"
                  type="text"
                  id="expiryYear"
                  name="expiryYear"
                  value={formData.cardDetails.expiryYear}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="cvc">CVC</label>
              <input style={{ width: "30%" }}
                placeholder="Enter your CVC"
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
            Place Order
          </button>
        </form>
      </div>
      <animated.div style={animationProps} className={styles.celebrationAnimation}>
  {/* Celebration animation content */}
  <svg className={styles.tickMark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M20.73 5.29l-9.99 9.99-5.3-5.3a.996.996 0 0 0-1.41 1.41l6 6 .01.01c.39.39 1.02.39 1.41 0l10-10a.996.996 0 0 0 0-1.41c-.39-.38-1.02-.38-1.42.01z" />
  </svg>
  Order Placed Successfully !!!
</animated.div>    </div>
  );
};

export default Payment;
