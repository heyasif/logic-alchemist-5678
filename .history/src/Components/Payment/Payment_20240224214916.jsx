import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import styles from "./Payment.module.css"; // Make sure to create this CSS module file
import { useCart } from "../../Context/CartContext";

const Payment = () => {
  const { currentUser } = useAuth();
  const { items: cartItems } = useCart(); // Assuming you have a Cart Context
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: currentUser?.id,
    date: new Date().toISOString().slice(0, 10), // Assuming you want the current date
    items: cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
    shippingInfo: {
      fullName: "",
      streetAddress: "",
      zipCode: "",
      city: "",
      email: "",
      shippingMethod: "Standard",
    },
    paymentInfo: {
      paymentMethod: "CreditCard",
      cardDetails: {
        cardNumber: "",
        nameOnCard: "",
        expiryDate: "",
        cvc: "",
      },
    },
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        shippingInfo: {
          ...prev.shippingInfo,
          shippingMethod: value,
        },
        paymentInfo: {
          ...prev.paymentInfo,
          paymentMethod: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      paymentInfo: {
        ...prev.paymentInfo,
        cardDetails: {
          ...prev.paymentInfo.cardDetails,
          [name]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format the data to match the expected API structure
    const orderData = {
      userId: formData.userId,
      date: formData.date,
      items: formData.items,
      shippingInfo: {
        fullName: formData.shippingInfo.fullName,
        streetAddress: formData.shippingInfo.streetAddress,
        zipCode: formData.shippingInfo.zipCode,
        city: formData.shippingInfo.city,
        email: formData.shippingInfo.email,
        shippingMethod: formData.shippingInfo.shippingMethod,
      },
      paymentInfo: {
        paymentMethod: formData.paymentInfo.paymentMethod,
        cardDetails: formData.paymentInfo.cardDetails,
      },
    };

    try {
      const response = await axios.post(
        "https://epicbazaar.onrender.com/orders",
        orderData
      );
      if (response.status === 200 || response.status === 201) {
        // Redirect to confirmation page or any other action upon success
        navigate("/order-confirmation");
      } else {
        throw new Error("Failed to submit order");
      }
    } catch (error) {
      console.error("Order submission error:", error);
    }
  };

  return (
    <div className={styles.paymentFormContainer}>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
      <h2 className={styles.formTitle}>Payment Information</h2>
      <form onSubmit={handleSubmit} className={styles.paymentForm}>
        <div className={styles.inputGroup}>
          <label htmlFor="fullName">Full name</label>
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
          <label htmlFor="streetAddress">Street address</label>
          <input
            type="text"
            id="streetAddress"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.splitInput}>
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
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Shipping Method */}
        <div className={styles.shippingMethods}>
          <label>Shipping Method</label>
          <div className={styles.radioGroup}>
            <input
              type="radio"
              id="standardShipping"
              name="shippingMethod"
              value="Standard"
              checked={formData.shippingMethod === "Standard"}
              onChange={handleInputChange}
            />
            <label htmlFor="standardShipping">Standard $4.99</label>
          </div>
          <div className={styles.radioGroup}>
            <input
              type="radio"
              id="expressShipping"
              name="shippingMethod"
              value="Express"
              checked={formData.shippingMethod === "Express"}
              onChange={handleInputChange}
            />
            <label htmlFor="expressShipping">Express $14.99</label>
          </div>
        </div>

        {/* Payment Method */}
        <div className={styles.paymentMethods}>
          <label>Payment Method</label>
          <div className={styles.radioGroup}>
            <input
              type="radio"
              id="creditCard"
              name="paymentMethod"
              value="CreditCard"
              checked={formData.paymentMethod === "CreditCard"}
              onChange={handleInputChange}
            />
            <label htmlFor="creditCard">Credit Card</label>
          </div>
          <div className={styles.radioGroup}>
            <input
              type="radio"
              id="paypal"
              name="paymentMethod"
              value="PayPal"
              checked={formData.paymentMethod === "PayPal"}
              onChange={handleInputChange}
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>

        {/* Card Details */}
        <div className={styles.cardDetails}>
          <div className={styles.inputGroup}>
            <label htmlFor="cardNumber">Credit card number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardDetails.cardNumber}
              onChange={handleCardDetailsChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="nameOnCard">Name on card</label>
            <input
              type="text"
              id="nameOnCard"
              name="nameOnCard"
              value={formData.cardDetails.nameOnCard}
              onChange={handleCardDetailsChange}
              required
            />
          </div>

          <div className={styles.splitInput}>
            <div className={styles.inputGroup}>
              <label htmlFor="expiryMonth">Expiry date</label>
              <select
                id="expiryMonth"
                name="expiryMonth"
                value={formData.cardDetails.expiryMonth}
                onChange={handleCardDetailsChange}
                required
              >
                {/* Generate month options */}
                {[...Array(12).keys()].map((month) => (
                  <option key={month} value={month + 1}>
                    {month + 1}
                  </option>
                ))}
              </select>
              <select
                id="expiryYear"
                name="expiryYear"
                value={formData.cardDetails.expiryYear}
                onChange={handleCardDetailsChange}
                required
              >
                {/* Generate year options */}
                {[...Array(10).keys()].map((year) => (
                  <option key={year} value={new Date().getFullYear() + year}>
                    {new Date().getFullYear() + year}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="cvc">CVC/CVV</label>
              <input
                type="text"
                id="cvc"
                name="cvc"
                maxLength="4"
                value={formData.cardDetails.cvc}
                onChange={handleCardDetailsChange}
                required
              />
            </div>
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
