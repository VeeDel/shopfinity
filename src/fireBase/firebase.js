// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlEYqBA6_CvN0AFjyeND3SSoiSlKL9JEM",
  authDomain: "shopfinity-9c660.firebaseapp.com",
  projectId: "shopfinity-9c660",
  storageBucket: "shopfinity-9c660.appspot.com",
  messagingSenderId: "171346394182",
  appId: "1:171346394182:web:c8cb7333d1b64989f81e47",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };
