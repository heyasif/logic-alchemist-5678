import React, {useEffect} from "react";
import { useProduct } from "../../Context/ProductContext";
import styles from "./styles.module.css";
import Spinner from "../../Components/Spinner";
import { useParams } from "react-router-dom";
import { useCart } from '../../Context/CartContext'
import { useFavorite } from '../../Context/FavoriteContext'
import Card from "../../Components/Card";
import Footer from "../../Components/Footer/Footer";

const Products = () => {
  const {addToCart, items} = useCart()
  const {addToFavorite, favoriteItems} = useFavorite()

  const { productList, loading, setProductID, setCategory } = useProduct();
  
  const {category_id} = useParams()

  useEffect(() => {
    setCategory(category_id)
  }, [category_id])

  return (
    <div className={styles.cardGroup} style={{ paddingTop: "30px"}} >
      {!loading ? (
        productList?.map((item, index) => {
          const findCartItem = items.find((cart_item) => cart_item.id === item.id)
          const findFavoriteItem = favoriteItems.find((favorite_item) => favorite_item.id === item.id)
          return (
            <Card key={`product-${index}`} item={item} setProductID={setProductID} findCartItem={findCartItem} findFavoriteItem={findFavoriteItem} addToCart={addToCart} addToFavorite={addToFavorite} />
          );
        })
      ) : (
        <Spinner />
      )}

      <Footer />
    </div>
  );
};

export default Products;