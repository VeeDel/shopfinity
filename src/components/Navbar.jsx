import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import logo from "../images/logo.png";
import styles from "./Navbar.module.css";
import { ShopContext } from "../context/ShopContext";
import {
  MagnifyingGlass,
  ShoppingBag,
  ShoppingBagOpen,
  SignOut,
} from "phosphor-react";
import ItemSearch from "./ItemSearch";
import { Modal } from "reactstrap";

export default function Navbar({ user }) {
  const { cartItems, handleLogout, toggleModel, isModelOpen } =
    useContext(ShopContext);

  const totleQuantity = Object.values(cartItems).reduce(
    (acc, quantity) => acc + quantity,
    0
  );
  // Check if the cart is empty
  const isCartEmpty = Object.values(cartItems).every((value) => value === 0);

  console.log(user);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img className={styles.logo} alt="Home" src={logo} />
          </Link>

          <div className="d-flex align-items-center">
            <MagnifyingGlass onClick={toggleModel} size={22} />

            {user && (
              <Link to={"/cart"} className="ml-3">
                {isCartEmpty ? (
                  <ShoppingBag size={24} />
                ) : (
                  <ShoppingBagOpen size={24} />
                )}
                {totleQuantity > 0 && (
                  <span className={styles.cartIcon__badge}>
                    {totleQuantity}
                  </span>
                )}
              </Link>
            )}

            {!user && (
              <div className="ml-3">
                <Link to={"/signup"}>
                  <button type="button" className="btn btn-warning">
                    SignUp
                  </button>
                </Link>
                <Link to={"/login"}>
                  <button type="button" className="btn btn-light">
                    Login
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {user && <h5>Hello, {user.displayName}</h5>}
      {isModelOpen && <ItemSearch class="model-popup" />}
    </div>
  );
}
