import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { PRODUCTS } from "../../components/product/products";
import styles from "./productDetails.module.css";
import { Lock, ShoppingCart } from "phosphor-react";
import { ShopContext } from "../../context/ShopContext";
import CommentSection from "../../components/comments/CommentSection";
// import { CommetnsBox } from "../../components/comments/commentsBox";
export default function ProductDetails({ user }) {
  const { id } = useParams();
  const productId = parseInt(id);

  const { addToCart } = useContext(ShopContext);
  const product = PRODUCTS.find((item) => item.id === productId);
  return (
    <div>
      <div className={styles.productsHome}>
        <div className={styles.productsHome}>
          <img alt={product.productName} src={product.imageUrl} />
          <div className={styles.productsDescription}>
            <h1>{product.productName}</h1>
            <h6 className={styles.price}>$ {product.price}</h6>

            <span>{product.description}</span>
            <br />
            <span>{product.brand}</span>
            {product.bullets.map((bullet) => {
              return <li>{bullet}</li>;
            })}
            <div>
              <button
                className={styles.addToCart}
                onClick={() => {
                  addToCart(productId);
                }}
                disabled={!user}
              >
                {!user ? "You Need To Login First" : " Add To Cart"}{" "}
                {!user ? (
                  <Lock size={18} color="#333" style={{ marginLeft: "5px" }} />
                ) : (
                  <ShoppingCart
                    size={18}
                    color="#333"
                    style={{ marginLeft: "5px" }}
                  />
                )}
              </button>
              {user && <button className={styles.buyItNow}>But it Now</button>}
            </div>
          </div>
        </div>
      </div>
      <div className="commentsBox">
        <CommentSection productId={product.id} />
      </div>
    </div>
  );
}
