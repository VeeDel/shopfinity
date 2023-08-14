import React from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

export default function logout() {
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log("logout succesfull");
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
