import React, { createContext, useState, useEffect } from "react";
import { PRODUCTS } from "../components/product/products";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../fireBase/firebase";

export const ShopContext = createContext({
  error: "",
  handleSubmit: async () => {},
  submitButtonDisabled: false,
});

function ShopContextProvider(props) {
  const [error, setError] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [userData, setUserData] = useState();
  const [userName, setUserName] = useState();
  const [isModelOpen, setIsModalOpen] = useState(false);
  const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i < PRODUCTS.length + 1; i++) {
      cart[i] = 0;
    }
    return cart;
  };
  const [cartItems, setCartItems] = useState(getDefaultCart());
  useEffect(() => {
    const authInstance = getAuth();

    const fetchUserData = async () => {
      const currentUser = authInstance.currentUser;
      console.log("c", currentUser);
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userSnapshot = await getDoc(userDocRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            const userName = userData.Name;
            const userCart = userData.Cart;

            setCartItems(userCart); // Update the cartItems state with the stored user cart
          } else {
            console.log("User document does not exist");
          }
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      } else {
        console.log("No user is currently signed in");
      }
    };

    // Add an observer to listen for user state changes (login/logout)
    const unsubscribe = authInstance.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData();
      } else {
        setCartItems(getDefaultCart()); // Reset cartItems when the user logs out
      }
    });

    // Clean up the observer when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  const addToCart = async (itemId) => {
    try {
      const currentUser = getAuth().currentUser;
      const userDocRef = doc(db, "users", currentUser.uid);

      await updateDoc(userDocRef, {
        [`Cart.${itemId}`]: cartItems[itemId] + 1,
      });

      const updatedUserSnapshot = await getDoc(userDocRef);
      const updatedCart = updatedUserSnapshot.data().Cart;
      setCartItems(updatedCart);

      console.log("Updated Cart:", updatedCart);
    } catch (error) {
      console.log("Error adding item to cart:", error);
    }
  };

  const deleteFromCart = async (itemId) => {
    try {
      const currentUser = getAuth().currentUser;
      const userDocRef = doc(db, "users", currentUser.uid);

      await updateDoc(userDocRef, {
        [`Cart.${itemId}`]: cartItems[itemId] - 1,
      });

      const updatedUserSnapshot = await getDoc(userDocRef);
      const updatedCart = updatedUserSnapshot.data().Cart;
      setCartItems(updatedCart);

      console.log("CartItem Deleted", updatedCart);
    } catch (error) {
      console.log("Error adding item to cart:", error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const currentUser = getAuth().currentUser;
      const userDocRef = doc(db, "users", currentUser.uid);

      await updateDoc(userDocRef, {
        [`Cart.${itemId}`]: 0,
      });

      const updatedUserSnapshot = await getDoc(userDocRef);
      const updatedCart = updatedUserSnapshot.data().Cart;
      setCartItems(updatedCart);

      console.log("Updated Cart:", updatedCart);
    } catch (error) {
      console.log("Error deleting item from cart:", error);
    }
  };

  const handleSubmit = async (name, email, password) => {
    if (!name || !email || !password) {
      setError("Please fill in all the fields");
      return;
    }

    setError("");
    setSubmitButtonDisabled(true);

    try {
      const authInstance = getAuth();
      const res = await createUserWithEmailAndPassword(
        authInstance,
        email,
        password
      );
      const user = res.user;
      console.log(user);

      //send the verification email
      sendEmailVerification(user);
      setUserData(user);

      // Add user data to Firestore collection
      await setDoc(doc(db, "users", user.uid), {
        Name: name,
        Email: email,
        Cart: cartItems,
        LatestOrder: [],
        TotalSpent: "",
        Orders: [],
      });

      const currentUser = authInstance.currentUser;
      setUserName(currentUser.displayName);

      // Update user profile display name
      await updateProfile(currentUser, {
        displayName: name,
      });

      setSubmitButtonDisabled(false);
    } catch (err) {
      setError(err.message);
      setSubmitButtonDisabled(false);
    }
  };

  const handleLogout = () => {
    const authInstance = getAuth();
    signOut(authInstance)
      .then(() => {
        console.log("success");
        window.location.href = "/"; // Redirect to the specified path
      })
      .catch((error) => {
        console.log("Error logging out:", error);
      });
  };
  const toggleModel = () => {
    setIsModalOpen((prevState) => !prevState);
    console.log("working....", isModelOpen);
  };
  return (
    <ShopContext.Provider
      value={{
        error,
        submitButtonDisabled,
        cartItems,
        handleSubmit,
        addToCart,
        deleteFromCart,
        removeItem,
        handleLogout,
        userData,
        userName,
        toggleModel,
        isModelOpen,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;
