import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import "bootstrap/dist/css/bootstrap.css";
import GoogleFontLoader from "react-google-font-loader";
import Footer from "./components/Footer";
import ProductDetails from "./pages/productDetails/ProductDetails";
import ShopContextProvider, { ShopContext } from "./context/ShopContext";
import Cart from "./pages/cart/Cart";
import "./App.css";
import Contact from "./pages/contact/Contact";
import SignUp from "./signUp/SignUp";
import Login from "./login/Login";
import { auth } from "./fireBase/firebase";
import Checkout from "./pages/checkout/Checkout";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";

const App = () => {
  const { userData } = useContext(ShopContext);
  console.log("user2", userData);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    let reloadFlag = false; // Flag to prevent infinite reloads

    const checkEmailVerification = (user) => {
      if (user && !user.emailVerified) {
        // If the user is logged in but their email is not verified, send a verification email
        sendEmailVerification(user)
          .then(() => {
            console.log("Verification email sent");
          })
          .catch((error) => {
            console.log("Error sending verification email:", error);
          });
      } else if (user && user.emailVerified && !reloadFlag) {
        // If the user is logged in, their email is verified, and the page hasn't reloaded, update your state accordingly
        setUser(user);
        setUserName(user.displayName);
      } else {
        // User is not logged in or email is not verified
        setUser(null);
        setUserName("");
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      checkEmailVerification(user); // Check email verification status
    });

    // Add an email verification change listener
    const emailVerificationListener = auth.onIdTokenChanged((user) => {
      if (user && !user.emailVerified && !reloadFlag) {
        user.getIdTokenResult().then((idTokenResult) => {
          if (idTokenResult.claims.email_verified !== user.emailVerified) {
            // If email verification status has changed, set the reloadFlag and reload the page
            reloadFlag = true;
            window.location.reload();
          }
        });
      }
    });

    // Clean up the observers when the component unmounts
    return () => {
      unsubscribe();
      emailVerificationListener();
    };
  }, []);
  return (
    <div className="App">
      <GoogleFontLoader fonts={[{ font: "Roboto", weights: [400, 700] }]} />
      <div className="container">
        <ShopContextProvider>
          <Router>
            <Navbar user={user} />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route
                path="/product/:id"
                element={<ProductDetails user={user} />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contact" element={<Contact />} />
              {/* Redirect to homepage if the user is logged in */}
              {!user && <Route path="/signup" element={<SignUp />} />}
              {!user && <Route path="/login" element={<Login />} />}
              {/* Redirect to homepage if the user is logged in */}
              {user && <Route path="/signup" element={<Navigate to="/" />} />}
              {user && <Route path="/login" element={<Navigate to="/" />} />}
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
            <Footer user={user} />
          </Router>
        </ShopContextProvider>
      </div>
    </div>
  );
};

export default App;
