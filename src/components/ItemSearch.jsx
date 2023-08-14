import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "./product/products";
import styles from "./itemSearch.module.css";
import { ShopContext } from "../context/ShopContext";
const ItemSearch = ({ setIsModalOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toggleModel } = useContext(ShopContext);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredItems = PRODUCTS.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery)
  );
  const closeModel = () => {
    toggleModel();
  };
  return (
    <div>
      <div className={styles.search}>
        <input
          className={styles.searchBar}
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search"
        />
        <button className={styles.close} onClick={closeModel}>
          &times;
        </button>
      </div>
      {searchQuery && filteredItems.length > 0 && (
        <div className={styles.searchedItems}>
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              onClick={closeModel}
              className={styles.link}
              to={`/product/${item.id}`}
            >
              <div className={styles.itemSearch}>
                <div className={styles.img}>
                  <img src={item.imageUrl} alt={item.productName} />
                </div>
                <p className={styles.itemName}>{item.productName}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemSearch;
