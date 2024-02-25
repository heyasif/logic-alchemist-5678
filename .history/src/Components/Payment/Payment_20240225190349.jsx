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
    paymentMethod: "CreditCard", // Default to CreditCard for initial state
    cardDetails: {
      cardNumber: "",
      expiry: "", // Combined expiry month and year
      cvc: "",
    },
    paypalEmail: "", // Additional field for PayPal email
  });
  const [showAnimation, setShowAnimation] = useState(false);
  const { reloadCartFromLocalStorage } = useCart();

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
    if (name === "cardNumber") {
      const formattedValue = value.replace(/\D/g, "").slice(0, 16);
      setFormData({
        ...formData,
        cardDetails: { ...formData.cardDetails, cardNumber: formattedValue },
      });
    } else if (name === "expiry") {
      let formattedValue = value
        .replace(
          /^([1-9]\/|[2-9])$/g,
          "0$1/" // Add 0 before single digit month
        )
        .replace(
          /^(0[1-9]|1[0-2])$/g,
          "$1/" // Add slash after MM
        )
        .replace(
          /^([0-1])([3-9])$/g,
          "0$1/$2" // Format 13-19 to 01/3 - 01/9
        )
        .replace(
          /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
          "$1/$2" // Add full year after MM/
        )
        .replace(
          /^([0]+)\/|[0]+$/g,
          "0" // Prevent 00/..
        )
        .replace(
          /[^\d\/]|^[\/]*$/g,
          "" // Prevent chars that aren't digits or slash
        )
        .slice(0, 5); // Limit to MM/YY format
      setFormData({
        ...formData,
        cardDetails: { ...formData.cardDetails, expiry: formattedValue },
      });
    } else if (name === "cvc") {
      const formattedValue = value.slice(0, 3);
      setFormData({
        ...formData,
        cardDetails: { ...formData.cardDetails, cvc: formattedValue },
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
      paymentMethod: formData.paymentMethod,
      paymentDetails:
        formData.paymentMethod === "CreditCard"
          ? {
              ...formData.cardDetails,
              expiryMonth: formData.cardDetails.expiry.split("/")[0],
              expiryYear: "20" + formData.cardDetails.expiry.split("/")[1],
            }
          : { paypalEmail: formData.paypalEmail },
    };

    try {
      const response = await axios.post(
        "https://epicbazaar.onrender.com/orders",
        orderData
      );
      if (response.status === 200 || response.status === 201) {
        // Clear the cart from localStorage
        localStorage.removeItem("cart");
        reloadCartFromLocalStorage();

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
      <div className={styles.paymentFormContainer}>
        <form onSubmit={handleSubmit} className={styles.paymentForm}>
          {/* Full Name */}
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

          {/* Street Address */}
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

          {/* City */}
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

          {/* Zip Code */}
          <div className={styles.inputGroup}>
            <label htmlFor="zipCode">Zip Code</label>
            <input
              placeholder="Enter your zip code"
              type="number"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Payment Method */}
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

          {/* Conditional Inputs based on Payment Method */}
          {formData.paymentMethod === "CreditCard" && (
            <div className={styles.cardDetails}>
              {/* Card Number */}
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
              {/* Expiry Date */}
              <div className={styles.inputGroup}>
                <label htmlFor="expiry">Expiry Date</label>
                <input
                  placeholder="MM/YY"
                  type="text"
                  id="expiry"
                  name="expiry"
                  value={formData.cardDetails.expiry}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* CVC */}
              <div className={styles.inputGroup}>
                <label htmlFor="cvc">CVC</label>
                <input
                  placeholder="CVC"
                  type="number"
                  id="cvc"
                  name="cvc"
                  value={formData.cardDetails.cvc}
                  maxLength="3"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          )}

          {formData.paymentMethod === "PayPal" && (
            <div className={styles.inputGroup}>
              <label htmlFor="paypalEmail">PayPal Email</label>
              <input
                placeholder="Enter your PayPal email"
                type="email"
                id="paypalEmail"
                name="paypalEmail"
                value={formData.paypalEmail}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          <button type="submit" className={styles.submitButton}>
            Place Order
          </button>
        </form>
      </div>
      <animated.div
        style={animationProps}
        className={styles.celebrationAnimation}
      >
        Order Placed Successfully !!!
      </animated.div>
    </div>
  );
};

export default Payment;
