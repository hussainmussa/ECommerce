

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJwItZKh7bijksU5wbKjSHsZfq5E5UzWA",
    authDomain: "ecommerce-main-app.firebaseapp.com",
    projectId: "ecommerce-main-app",
    storageBucket: "ecommerce-main-app.appspot.com",
    messagingSenderId: "696660392971",
    appId: "1:696660392971:web:e2272a9428afe651481b0e",
    measurementId: "G-Q59GD6XH4R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}