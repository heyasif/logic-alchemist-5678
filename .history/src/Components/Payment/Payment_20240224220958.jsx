import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import styles from "./Payment.module.css"; // Make sure to create this CSS module file

const Payment = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: currentUser ? currentUser.id : null,
    fullName: "",
    streetAddress: "",
    zipCode: "",
    city: "",
    email: "",
    shippingMethod: "Express",
    paymentMethod: "Credit Card",
    cardDetails: {
      cardNumber: "",
      nameOnCard: "",
      expiryMonth: "",
      expiryYear: "",
      cvc: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      cardDetails: { ...formData.cardDetails, [name]: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      userId: currentUser ? currentUser.id : null,
      fullName: formData.fullName,
      streetAddress: formData.streetAddress,
      zipCode: formData.zipCode,
      city: formData.city,
      email: formData.email,
      shippingMethod: formData.shippingMethod,
      paymentMethod: formData.paymentMethod,
      cardDetails: {
        cardNumber: formData.cardDetails.cardNumber,
        nameOnCard: formData.cardDetails.nameOnCard,
        expiryDate: `${formData.cardDetails.expiryMonth}/${formData.cardDetails.expiryYear}`,
        cvc: formData.cardDetails.cvc,
      },
      items: [], // Add items details here
    };

    try {
      const response = await axios.post(
        "https://epicbazaar.onrender.com/orders",
        orderData
      );
      if (response.status === 200 || response.status === 201) {
        navigate("/");
      } else {
        console.error(
          "Failed to submit order:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error(
        "Order submission error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className={styles.paymentFormContainer}>
      <h2 className={styles.formTitle}>Payment Information</h2>
      <form onSubmit={handleSubmit} className={styles.paymentForm}>
        {/* Full Name */}
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

        {/* Address */}
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

        {/* Email */}
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
          {/* Include radio buttons or other input elements for selecting shipping method */}
        </div>

        {/* Payment Method */}
        <div className={styles.paymentMethods}>
          {/* Include radio buttons or other input elements for selecting payment method */}
        </div>

        {/* Card Details */}
        <div className={styles.cardDetails}>
          {/* Include form inputs for card details like card number, name on card, expiry date, and cvc */}
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default Payment;
