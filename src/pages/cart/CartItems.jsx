import React, { useContext, useState, useEffect } from "react";
import styles from "./cartItems.module.css";
import { ShopContext } from "../../context/ShopContext";
import { Trash } from "phosphor-react";

const CartItems = ({ data, total }) => {
  const { cartItems, addToCart, deleteFromCart, removeItem } =
    useContext(ShopContext);
  const [item, setItem] = useState(cartItems[data.id]);

  useEffect(() => {
    setItem(cartItems[data.id]); // Update item when cartItems change
  }, [cartItems, data.id]);

  const quantityIncrease = (id) => {
    addToCart(id);
  };

  const quantityDeccrease = (id) => {
    deleteFromCart(id);
  };

  const removeItemFromCart = (id) => {
    removeItem(id);
  };

  return (
    <div>
      <div className={styles.product}>
        <div className={styles.productInfo}>
          <img src={data.imageUrl} alt="Product" />
          <div>
            <h6>{data.productName}</h6>
            <p>${data.price}</p>
            <p style={{ fontSize: "10px" }}>{data.brand}</p>
          </div>
        </div>
        <div className={styles.quantity}>
          <div className={styles.buttonsDiv}>
            <div className={styles.buttons}>
              <button
                onClick={() => {
                  quantityDeccrease(data.id);
                }}
                disabled={item === 1}
                className={styles.button}
              >
                -
              </button>
              <p className={styles.quantityNumber}>{item}</p>
              <button
                onClick={() => {
                  quantityIncrease(data.id);
                }}
                className={styles.button}
                disabled={item === 9}
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              removeItemFromCart(data.id);
            }}
            className={styles.removeButton}
          >
            <Trash />
          </button>
        </div>
        <div>
          <p className={styles.price}>${data.price}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
