import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../../components/product/products";
import styles from "./home.module.css";
const Home = (props) => {
  return (
    <div className={styles.home}>
      <h5>{props.name ? `wellcom - ${props.name}` : "Login Please"}</h5>
      <div className={styles.products}>
        {PRODUCTS.map((product) => (
          <div className={styles.product} key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img src={product.imageUrl} alt={product.productName} />
            </Link>

            <div className={styles.detailsTtital}>
              <div>
                <Link to={`/product/${product.id}`}>
                  <p className={styles.productName}>{product.productName}</p>
                </Link>
                <p>${product.price} USD</p>
              </div>
              {/* <button className={styles.buttonAdd}>Add</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
