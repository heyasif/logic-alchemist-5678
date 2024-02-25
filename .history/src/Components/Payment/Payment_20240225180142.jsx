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
    paymentMethod: "CreditCard", // Default to CreditCard
    cardDetails: {
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvc: "",
    },
    paypalEmail: "",
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
    if (name === "paymentMethod") {
      setFormData({
        ...formData,
        [name]: value,
        paypalEmail: value === "PayPal" ? formData.paypalEmail : "",
      });
    } else if (name in formData.cardDetails) {
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

    // Add your validation logic here

    const orderData = {
      // Populate your order data here
    };

    try {
      // Your axios call and subsequent logic
    } catch (error) {
      console.error("Order submission error:", error);
    }
  };

  return (
    <div id="parent">
      <div className={styles.paymentFormContainer}>
        <form onSubmit={handleSubmit} className={styles.paymentForm}>
          {/* Existing input fields for fullName, streetAddress, etc. */}

          <div className={styles.inputGroup}>
            <label>Payment Method</label>
            <div>
              <input
                type="radio"
                name="paymentMethod"
                value="CreditCard"
                checked={formData.paymentMethod === "CreditCard"}
                onChange={handleInputChange}
              />{" "}
              Credit Card
              <input
                type="radio"
                name="paymentMethod"
                value="PayPal"
                checked={formData.paymentMethod === "PayPal"}
                onChange={handleInputChange}
              />{" "}
              PayPal
            </div>
          </div>

          {formData.paymentMethod === "CreditCard" && (
            <>{/* Existing Card Details Inputs */}</>
          )}

          {formData.paymentMethod === "PayPal" && (
            <div className={styles.inputGroup}>
              <label htmlFor="paypalEmail">PayPal Email</label>
              <input
                type="email"
                id="paypalEmail"
                name="paypalEmail"
                value={formData.paypalEmail}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          {/* Rest of the form */}
          <button type="submit" className={styles.submitButton}>
            Place Order
          </button>
        </form>
      </div>
      <animated.div
        style={animationProps}
        className={styles.celebrationAnimation}
      >
        {/* Animation content */}
        Order Placed Successfully !!!
      </animated.div>
    </div>
  );
};

export default Payment;
