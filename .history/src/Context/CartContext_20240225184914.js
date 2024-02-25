import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || []
  );

  // Effect to sync cart with localStorage when items change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // Effect to listen for storage changes and update cart accordingly
  // This ensures cart state syncs across tabs/windows
  useEffect(() => {
    const handleStorageEvent = (event) => {
      if (event.key === "cart") {
        setItems(JSON.parse(event.newValue) || []);
      }
    };

    window.addEventListener("storage", handleStorageEvent);
    return () => {
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, []);

  const addToCart = (data, findCartItem) => {
    if (!findCartItem) {
      setItems((items) => [data, ...items]);
    } else {
      const filtered = items.filter((item) => item.id !== findCartItem.id);
      setItems(filtered);
    }
  };

  const removeFromCart = (item_id) => {
    const filtered = items.filter((item) => item.id !== item_id);
    setItems(filtered);
  };

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, reloadCartFromLocalStorage }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
