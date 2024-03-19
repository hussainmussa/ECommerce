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
    const jobFields = [
      "Electrician",
      "Plumber",
      "Mechanic",
      "Marketing",
      "Construction",
      "Gardener",
      "House Cleaner",
      "Painter",
      "Roofer",
      "Locksmith",
      "Carpenter",
      "Interior Designer",
      "HVAC Technician",
      "Landscaper",
      "Architect",
      "Web Developer",
      "Graphic Designer",
      "Chef",
      "Event Planner",
      "Fitness Trainer"
    ];
    
    const streets = [
      { name: 'Al-Quds', cities: ['Nazareth', 'Umm al-Fahm', 'Tayibe'] },
      { name: 'Al-Aqsa', cities: ['Nazareth', 'Umm al-Fahm', 'Tayibe'] },
      { name: 'Al-Haram', cities: ['Nazareth', 'Umm al-Fahm', 'Tayibe'] },
      { name: 'Al-Nour', cities: ['Rahat', 'Kafr Qasim', 'Tayibe'] },
      { name: 'Al-Rahma', cities: ['Rahat', 'Kafr Qasim', 'Tayibe'] },
      { name: 'Al-Maghreb', cities: ['Kafr Qasim', 'Tayibe', 'Sakhnin'] },
      { name: 'Al-Mashreq', cities: ['Tayibe', 'Sakhnin', 'Tamra'] },
      { name: 'Al-Mostaqbal', cities: ['Sakhnin', 'Tamra', 'Baqa al-Gharbiyye'] },
      { name: 'Al-Amal', cities: ['Tamra', 'Baqa al-Gharbiyye', 'Ar\'ara'] },
      { name: 'Al-Wahda', cities: ['Baqa al-Gharbiyye', 'Ar\'ara', 'Tira'] },
      { name: 'Al-Istiqlal', cities: ['Ar\'ara', 'Tira', 'Jatt'] },
      { name: 'Al-Adala', cities: ['Tira', 'Jatt', 'Kfar Kanna'] },
      { name: 'Al-Huriya', cities: ['Jatt', 'Kfar Kanna', 'Barta\'a'] },
      { name: 'Al-Qanun', cities: ['Kfar Kanna', 'Barta\'a', 'Arraba'] },
      { name: 'Al-Democratiya', cities: ['Barta\'a', 'Arraba', 'Jisr az-Zarqa'] },
      { name: 'Al-Shari\'a', cities: ['Arraba', 'Jisr az-Zarqa', 'Deir al-Assad'] },
      { name: 'Al-Najah', cities: ['Jisr az-Zarqa', 'Deir al-Assad', 'Arraba'] },
      { name: 'Al-Balad', cities: ['Deir al-Assad', 'Arraba', 'Tuba-Zangariyye'] },
      { name: 'Al-Ittihad', cities: ['Arraba', 'Tuba-Zangariyye', 'Yarka'] },
      { name: 'Al-Hayat', cities: ['Tuba-Zangariyye', 'Yarka', 'Kuseife'] }
      // Add more streets here
    ];
    
    
    
    const israeliFirstNames1 = [
      "Yosef", "David", "Daniel", "Moshe", "Avraham", "Shlomo", "Yaakov", "Yitzhak", "Yehuda", "Chaim", "Yisrael", "Ariel", "Eliezer", "Eitan", "Yakov", "Yair", "Itzhak", "Uri", "Meir", "Ovadia"
    ];
    const israeliFirstNames = [
      "Mohammed", "Ahmed", "Ali", "Omar", "Youssef", "Hassan", "Abdullah", "Khalid", "Ibrahim", "Mahmoud", "Abdulaziz", "Nasser", "Tariq", "Bilal", "Faisal", "Saeed", "Hussein", "Nabil", "Salem", "Majid"
    ];
    

    const israeliLastNames1 = [
      "Cohen", "Levi", "Mizrachi", "Katz", "Peretz", "Weiss", "Goldberg", "Friedman", "Shapira", "Cohen", "Avrahami", "Levy", "Biton", "Amir", "Cohen", "Dayan", "Weinstein", "Shalom", "Zafrani"
      // Add more last names as needed
    ];
    const israeliLastNames = [
      "Al-Farsi", "Al-Saud", "Al-Masri", "Al-Khalifa", "Al-Abdullah", "Al-Hashemi", "Al-Maktoum", "Al-Nasser", "Al-Habib", "Al-Qasimi", "Al-Zahrani", "Al-Muhanna", "Al-Moussa", "Al-Shaikh", "Al-Dosari", "Al-Ahmadi", "Al-Jaber", "Al-Shehri", "Al-Mansoori", "Al-Ghannam"
    ];

    for (let i = 1; i <= 10; i++) {
      const firstName = israeliFirstNames[getRandomInt(0, israeliFirstNames.length - 1)];
      const lastName = israeliLastNames[getRandomInt(0, israeliLastNames.length - 1)];
      const fullName = `${firstName} ${lastName}`;
      const country = 'Israel';
      const streetObj = streets[getRandomInt(0, streets.length - 1)];
      const city = streetObj.cities[getRandomInt(0, streetObj.cities.length - 1)];
      const street = streetObj.name;
      const streetNumber = getRandomInt(1, 200);
      const phoneNumber = generatePhoneNumber();
      const jobField = jobFields[getRandomInt(0, jobFields.length - 1)];

      const contractor = {
        fullname: fullName,
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



