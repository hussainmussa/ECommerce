import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCJwItZKh7bijksU5wbKjSHsZfq5E5UzWA",
    authDomain: "ecommerce-main-app.firebaseapp.com",
    projectId: "ecommerce-main-app",
    storageBucket: "ecommerce-main-app.appspot.com",
    messagingSenderId: "696660392971",
    appId: "1:696660392971:web:e2272a9428afe651481b0e",
    measurementId: "G-Q59GD6XH4R"
  };

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth();
auth.languageCode = 'it';
export {firestore,app , auth};



