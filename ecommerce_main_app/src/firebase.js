import { initializeApp } from "firebase/app";
import {getFirestore, collection, addDoc} from "@firebase/firestore";
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
// Function to generate a random integer within a range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random phone number
function generatePhoneNumber() {
  const phoneNumber = `+9725${getRandomInt(10000000, 99999999)}`;
  return phoneNumber;
}

// Function to generate virtual contractors
async function generateVirtualContractors() {
  try {
    const jobFields = ["Electrician", "Plumber", "Mechanic", "Marketing", "Construction", "Gardener", "House Cleaner", "Painter", "Roofer", "Locksmith"];
    const streets = [
      { name: 'Balfour', cities: ['Jerusalem', 'Tel Aviv', 'Haifa'] },
      { name: 'Ben Yehuda', cities: ['Jerusalem', 'Tel Aviv'] },
      { name: 'Bialik', cities: ['Tel Aviv', 'Petah Tikva'] },
      { name: 'Dizengoff', cities: ['Tel Aviv'] },
      { name: 'Herzl', cities: ['Tel Aviv', 'Haifa', 'Rishon LeZion'] },
      { name: 'Ibn Gabirol', cities: ['Tel Aviv'] },
      { name: 'Jabotinsky', cities: ['Jerusalem', 'Tel Aviv'] },
      { name: 'Weizmann', cities: ['Tel Aviv', 'Rehovot'] },
      { name: 'Yitzhak Rabin', cities: ['Tel Aviv'] },
      { name: 'Levi Eshkol', cities: ['Jerusalem', 'Modiin'] },
      { name: 'Hertzel', cities: ['Tel Aviv', 'Haifa', 'Rishon LeZion'] },
      { name: 'King George', cities: ['Jerusalem'] },
      { name: 'Allenby', cities: ['Tel Aviv'] },
      { name: 'Rothschild', cities: ['Tel Aviv'] },
      { name: 'Kaplan', cities: ['Rishon LeZion', 'Tel Aviv'] },
      { name: 'HaHashmonaim', cities: ['Petah Tikva'] },
      { name: 'HaMaccabim', cities: ['Netanya'] },
      { name: 'HaNeviim', cities: ['Jerusalem'] },
      { name: 'HaPalmach', cities: ['Ramat Gan'] },
      { name: 'HaShalom', cities: ['Tel Aviv'] },
      { name: 'HaTikva', cities: ['Tel Aviv'] },
      { name: 'HaYarkon', cities: ['Tel Aviv'] },
      { name: 'HaZerem', cities: ['Jerusalem'] },
      { name: 'HaZoref', cities: ['Jerusalem'] },
      { name: 'Jaffa', cities: ['Tel Aviv'] },
      { name: 'Yehuda HaLevi', cities: ['Tel Aviv'] },
      { name: 'Rabbi Akiva', cities: ['Jerusalem'] },
      { name: 'Keren HaYesod', cities: ['Jerusalem'] },
      { name: 'Shlomo HaMelech', cities: ['Tel Aviv'] }
    ];
    

    for (let i = 1; i <= 5; i++) {
      const name = `Contractor ${i}`;
      const country = 'Israel';
      const streetObj = streets[getRandomInt(0, streets.length - 1)];
      const city = streetObj.cities[getRandomInt(0, streetObj.cities.length - 1)];
      const street = streetObj.name;
      const streetNumber = getRandomInt(1, 200);
      const phoneNumber = generatePhoneNumber();
      const jobField = jobFields[getRandomInt(0, jobFields.length - 1)];

      const contractor = {
        fullname: name,
        country: country,
        city: city,
        street: street,
        streetnumber: streetNumber,
        phonenumber: phoneNumber,
        jobfield: jobField
      };

      // Add the contractor to Firestore
      await addDoc(collection(db, 'Contractors'), contractor);
    }

    console.log('Virtual contractors generated successfully.');
  } catch (error) {
    console.error('Error generating virtual contractors: ', error);
  }
}


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const firestore = getFirestore(app);
const auth = getAuth();

export {firestore,app , auth};



