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
      try {
        const response = await axios.get(
          "https://epicbazaar.onrender.com/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    setLoading(true);
    const getProductData = async () => {
      try {
        let url = "https://epicbazaar.onrender.com/products";
        if (category && category.length > 0) {
          url += `?category=${category}`;
        }
        const response = await axios.get(url);
        setProductList(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };
    getProductData();
  }, [category]);

  useEffect(() => {
    setLoading(true);
    const getProductDetail = async () => {
      try {
        if (productID && productID.length > 0) {
          const response = await axios.get(
            `https://epicbazaar.onrender.com/products/${productID}`
          );
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Error fetching product detail:", error);
      } finally {
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
