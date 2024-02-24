import React from "react";
import { useHistory } from "react-router-dom"; // Import useHistory from 'react-router-dom'

const Modal = ({ isOpen, onClose, children }) => {
  const history = useHistory(); // Initialize useHistory hook

  // Modified onClose function to redirect to /login
  const onClose = () => {
    history.push("/login");
  };
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent backdrop
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050, // Ensure it's above other content
      }}
    >
      <div
        style={{
          margin: "auto",
          background: "white",
          borderRadius: "8px",
          padding: "20px",
          minWidth: "300px", // Minimum width
          maxWidth: "90%", // Ensure it doesn't exceed the viewport width
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
          zIndex: 1051, // Ensure the modal content is above the backdrop
        }}
      >
        {children}
        <div style={{ marginTop: "10px", textAlign: "right" }}>
          <button
            onClick={onClose}
            style={{
              padding: "5px 10px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
