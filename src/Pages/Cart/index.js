import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import styles from "./styles.module.css";

const Cart = () => {
  const { items, removeFromCart } = useCart();
  const navigate = useNavigate();

  const subtotal = items.reduce((acc, obj) => acc + obj.price, 0).toFixed(2);
  const total = (parseFloat(subtotal) + 10).toFixed(2);

  const handleCheckout = () => {
    navigate("/payment", { state: { items: items } });
  };

  return (
    <div>
      {items.length < 1 && (
        <div className="flex flex-wrap max-w-7xl mx-auto my-4">
          <div className="w-full sm:w-2/2 md:w-2/2 xl:w-5/5 p-4 h-[500px] my-auto ">
            <div className={styles.cardBg}>
              <ShoppingCartIcon className="h-40 w-40 mx-auto mt-10  " />
              
              <p className="text-xl font-extralight tracking-widest text-center pt-6">
                There are no products in your cart.
              </p>
              <p className="text-center mt-2 font-bold tracking-wide">
                Add the products you like to the cart and buy.
              </p>
              <Link to="/">
                <div className={styles.continueButton}>
                  <button className={styles.button}>
                    <div className="flex flex-col self-center">
                      <span className="text-white ">
                        Continue Shopping
                      </span>
                    </div>
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div className="flex flex-wrap max-w-7xl mx-auto my-4 ">
          <div className="flex flex-col flex-1 bg-sky-100 p-4 m-4">
            {items.map((item) => (
              <div
                className="w-full sm:w-2/2 md:w-2/2 xl:w-5/5 p-4 my-auto"
                key={item.id}
              >
                <div className={styles.bgCart}>
                  <div className="flex flex-row h-48 ">
                    <img
                      className="w-32 my-auto p-4 object-contain "
                      src={item.image}
                      alt="Cart Item"
                    />
                    <div className="flex flex-col ml-2 mt-2">
                      <Link to={`/product/${item.id}`}>
                        <h2 className="text-sm title-font text-zinc-900 tracking-widest hover:text-blue-600 mt-2">
                          {item.brand}
                        </h2>
                        <p className="text-black text-xl">{item.title}</p>
                      </Link>
                      <p className="text-stone-700 my-2 overflow-auto">{item.description}</p>
                      <p className="mt-auto mb-4 text-stone-800 text-xl">
                        $ {item.price}
                      </p>
                    </div>
                    <div className="flex flex-row ml-auto">
                      <button
                        className="w-5 h-5 ml-auto m-4 hover:text-red-500"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full h-full sm:w-2/2 md:w-2/2 xl:w-1/5 p-4 bg-slate-300 rounded-md m-8">
            <div className={styles.bgCart}>
              <div className="flex flex-col p-4 text-slate-800">
                <span className="text-xl mb-4 font-semibold">
                  Order Summary
                </span>
                <span className="text-sm my-2 font-extralight flex ">
                  Subtotal{" "}
                  <span className="ml-auto font-normal text-slate-800">$ {subtotal}</span>
                </span>
                <span className="text-sm my-2 font-extralight flex">
                  Shipping Estimate{" "}
                  <span className="ml-auto font-normal text-slate-800">$ 5</span>
                </span>
                <span className="text-sm my-2 font-extralight flex">
                  Tax Estimate <span className="ml-auto font-normal text-slate-800">$ 5</span>
                </span>
                <span className="text-md my-2 font-normal flex">
                  Order Total <span className="ml-auto text-slate-800">$ {total}</span>
                </span>
                <button
                  className="px-1 py-2 bg-slate-800 text-white rounded"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
