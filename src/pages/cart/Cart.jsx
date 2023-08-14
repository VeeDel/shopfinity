import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { Link } from "react-router-dom";
import { ArrowArcRight } from "phosphor-react";
import { PRODUCTS } from "../../components/product/products";
import CartItems from "./CartItems";
import styles from "./cart.module.css";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(ShopContext);
  const [order, setOrder] = useState([]);
  // const [cart, setCart] = useState([]); // Define cart as a state variable?
  const cartIsEmpty = Object.values(cartItems).every((value) => value === 0);
  let totalPayment = 0;

  return (
    <div>
      {cartIsEmpty && (
        <div className={styles.cartIsEmpty}>
          <h3>Your Cart is Empty</h3>
          <Link to={"/"}>
            <button className={styles.checkoutButton}>Continue Shopping</button>
          </Link>
        </div>
      )}
      {!cartIsEmpty && (
        <div className={styles.mainCartDiv}>
          <div className={styles.yourCart}>
            <h1>Your Cart</h1>
            <Link className={styles.continueLink} to={"/"}>
              Continue Shopping <ArrowArcRight size={24} />
            </Link>
          </div>
          <div className={styles.titels}>
            <p className={styles.tital}>PRODUCT</p>
            <p className={styles.tital}>QUANTITY</p>
            <p className={styles.tital}>PRICE</p>
          </div>
          {PRODUCTS.map((product) => {
            if (cartItems[product.id] !== 0) {
              totalPayment += product.price * cartItems[product.id];
              return (
                <CartItems
                  key={product.id}
                  data={product} // Pass individual product as data instead of cart array
                  total={totalPayment.toFixed(2)}
                />
              );
            }
            return null; // Added return null for cases where cartItems[product.id] === 0
          })}
          <div className={styles.checkout}>
            <h6 className={styles.total}>
              Subtotal ${totalPayment.toFixed(2)} USD
            </h6>
            <button className={styles.checkoutButton}>Check Out</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
