import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [productID, setProductID] = useState("");
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getCategories = async () => {
      // Assuming your new API provides a specific endpoint for categories
      // If not, you might need to fetch all products and extract categories from them
      // For this example, I'll assume categories need to be hardcoded or fetched in a different way
      let categoriesData = [
        "electronics",
        "jewelery",
        "men's clothing",
        "women's clothing",
      ]; // Example categories
      setCategories(categoriesData);
      setLoading(false);
    };
    getCategories();
  }, []);

  useEffect(() => {
    setLoading(true);
    const getProductData = async () => {
      const endpoint = category
        ? `https://epicbazaar.onrender.com/products?category=${category}`
        : "https://epicbazaar.onrender.com/products";
      await axios.get(endpoint).then((res) => {
        setProductList(res.data);
        setLoading(false);
      });
    };
    getProductData();
  }, [category]);

  useEffect(() => {
    setLoading(true);
    const getProductDetail = async () => {
      if (productID) {
        await axios
          .get(`https://epicbazaar.onrender.com/products/${productID}`)
          .then((res) => {
            setProduct(res.data);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    };
    getProductDetail();
  }, [productID]);

  const values = {
    product,
    productList,
    productID,
    setProductID,
    categories,
    setCategory,
    loading,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
