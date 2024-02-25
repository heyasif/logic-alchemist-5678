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
    paypalEmail: "",
  });
  const [showAnimation, setShowAnimation] = useState(false);
  const [formErrors, setFormErrors] = useState({});

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
        cardDetails: value === "CreditCard" ? { ...formData.cardDetails } : {},
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

  const validateForm = () => {
    let errors = {};
    if (formData.paymentMethod === "CreditCard") {
      if (
        !formData.cardDetails.cardNumber ||
        formData.cardDetails.cardNumber.length !== 16
      ) {
        errors.cardNumber = "Card number must be 16 digits.";
      }
      if (
        !formData.cardDetails.expiryMonth ||
        formData.cardDetails.expiryMonth.length < 1 ||
        formData.cardDetails.expiryMonth.length > 2 ||
        parseInt(formData.cardDetails.expiryMonth) > 12 ||
        parseInt(formData.cardDetails.expiryMonth) < 1
      ) {
        errors.expiryMonth = "Invalid expiry month.";
      }
      if (
        !formData.cardDetails.expiryYear ||
        formData.cardDetails.expiryYear.length !== 4
      ) {
        errors.expiryYear = "Expiry year must be 4 digits.";
      }
      if (
        !formData.cardDetails.cvc ||
        formData.cardDetails.cvc.length < 3 ||
        formData.cardDetails.cvc.length > 4
      ) {
        errors.cvc = "CVC must be 3 or 4 digits.";
      }
    } else if (formData.paymentMethod === "PayPal" && !formData.paypalEmail) {
      errors.paypalEmail = "PayPal email is required.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      if (!currentUser || !currentUser.email) {
        console.error("No user logged in");
        return;
      }

      // Prepare your order data here...
      // For example:
      const orderData = {
        email: formData.email,
        items: cartItems,
        paymentMethod: formData.paymentMethod,
        paymentDetails:
          formData.paymentMethod === "CreditCard"
            ? formData.cardDetails
            : { paypalEmail: formData.paypalEmail },
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
          }, 2000);
        } else {
          console.error("Failed to submit order:", response.statusText);
        }
      } catch (error) {
        console.error(
          "Order submission error:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  return (
    <div className={styles.paymentFormContainer}>
      <form onSubmit={handleSubmit} className={styles.paymentForm}>
        {/* Form fields for fullName, streetAddress, city, zipCode, and email */}

        <div>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="CreditCard"
              checked={formData.paymentMethod === "CreditCard"}
              onChange={handleInputChange}
            />
            Credit Card
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="PayPal"
              checked={formData.paymentMethod === "PayPal"}
              onChange={handleInputChange}
            />
            PayPal
          </label>
        </div>

        {formData.paymentMethod === "CreditCard" && (
          <div>
            {/* Credit Card Details */}
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={formData.cardDetails.cardNumber}
              onChange={handleInputChange}
              required={formData.paymentMethod === "CreditCard"}
            />
            {formErrors.cardNumber && <p>{formErrors.cardNumber}</p>}
            <input
              type="text"
              name="expiryMonth"
              placeholder="Expiry Month (MM)"
              value={formData.cardDetails.expiryMonth}
              onChange={handleInputChange}
              required={formData.paymentMethod === "CreditCard"}
            />
            {formErrors.expiryMonth && <p>{formErrors.expiryMonth}</p>}
            <input
              type="text"
              name="expiryYear"
              placeholder="Expiry Year (YYYY)"
              value={formData.cardDetails.expiryYear}
              onChange={handleInputChange}
              required={formData.paymentMethod === "CreditCard"}
            />
            {formErrors.expiryYear && <p>{formErrors.expiryYear}</p>}
            <input
              type="text"
              name="cvc"
              placeholder="CVC"
              value={formData.cardDetails.cvc}
              onChange={handleInputChange}
              required={formData.paymentMethod === "CreditCard"}
            />
            {formErrors.cvc && <p>{formErrors.cvc}</p>}
          </div>
        )}

        {formData.paymentMethod === "PayPal" && (
          <div>
            {/* PayPal Email */}
            <input
              type="email"
              name="paypalEmail"
              placeholder="PayPal Email"
              value={formData.paypalEmail}
              onChange={handleInputChange}
              required={formData.paymentMethod === "PayPal"}
            />
            {formErrors.paypalEmail && <p>{formErrors.paypalEmail}</p>}
          </div>
        )}

        <button type="submit" className={styles.submitButton}>
          Place Order
        </button>
      </form>

      <animated.div
        style={animationProps}
        className={styles.celebrationAnimation}
      >
        {/* Celebration animation content */}
        Order Placed Successfully!!!
      </animated.div>
    </div>
  );
};

export default Payment;
