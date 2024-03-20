import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { addDoc, collection } from "@firebase/firestore";
import "./User.css"; 
import BottomBar from "../components/BottomBar";
import { useLocation, useNavigate } from "react-router-dom";
import { 
    query,
    where,
    getDocs,
    doc,
    updateDoc,
    getDoc } from "firebase/firestore";
import { MdOutlinePhoneIphone } from "react-icons/md";


const User = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { phoneNumber } = location.state || {};
  const { name = "default", userLocation = "default", job = "default", bio = "default" } =  {};

  const [inputFields, setInputFields] = useState([
    { id: 1, label: "name", value: name, error: "" },
    { id: 2, label: "userLocation", value: userLocation, error: "" },
    { id: 3, label: "job", value: job, error: "" },
    { id: 4, label: "bio", value: bio, error: "" },
  ]);

  
  useEffect(() => {
    const fetchUserData = async () => {


    //Get query that fits the phone number
    const contractorsRef = collection(firestore, "Users");
    const q = query(contractorsRef, where("phonenumber", "==", phoneNumber));

    const querySnapshot = await getDocs(q);
    //Change the doc
    if (!querySnapshot.empty) {
      const documentId = querySnapshot.docs[0].id; // Get the document ID
    


      const docRef = doc(firestore, "Users", documentId); // Replace "yourDocumentId" with the actual ID
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setInputFields([
          { id: 1, label: "name", value: docSnap.data().name, error: "" },
          { id: 2, label: "userLocation", value: docSnap.data().location, error: "" },
          { id: 3, label: "job", value: docSnap.data().job, error: "" },
          { id: 4, label: "bio", value: docSnap.data().bio, error: "" },
        ]);
      } else {
        console.log("No such document!");
      }
    }else {
        console.log("No such document!");
      }
    };
  
    fetchUserData();
  }, []); // Empty dependency array means this runs once on mount
  


  const handleSave = async (e) => {
    e.preventDefault();
    
    const newInputFields = inputFields.map((field) => {
      if(field.value === undefined){
        field.value = "default";
      }
      if (field.value.trim() === "") {
        return { ...field, error: "This field is required" };
      } else {
        return { ...field, error: "" };
      }
    });

    setInputFields(newInputFields);

    if (newInputFields.some((field) => field.error !== "")) {
      return;
    }

    let data = {};

    inputFields.forEach((field) => {
      data[field.label.toLowerCase()] = field.value;
    });

    data["phonenumber"] = phoneNumber;

    try {
    //Get query that fits the phone number
    const contractorsRef = collection(firestore, "Users");
    const q = query(contractorsRef, where("phonenumber", "==", phoneNumber));

    const querySnapshot = await getDocs(q);
    //Change the doc
    if (!querySnapshot.empty) {
      const documentId = querySnapshot.docs[0].id; // Get the document ID
    

        const docRef = doc(firestore, "Users", documentId); 
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log(data);
            await updateDoc(docRef, data);
        }else {
            console.log("No such document!");
            await addDoc(docRef, data);
          }
  } else {
          console.log("No such document!");
          const ref = collection(firestore, "Users");
          await addDoc(ref, data);
        }

      setInputFields(
        inputFields.map((field) => ({ ...field, value: "", error: "" }))
      );
    } catch (error) {
      console.error(error);
    }
    navigate("../ProfilePage");
  };

  const handleChange = (e, id) => {
    const newInputFields = inputFields.map((field) => {
      if (field.id === id) {
        let value = e.target.value;

        if (
          ["name", "location", "bio"].includes(
            field.label
          )
        ) {
          value = value.replace(/[^a-zA-Z\s]/g, "");
        }

        if (["number"].includes(field.label)) {
          value = value.replace(/[^0-9]/g, "");
        }

        return { ...field, value: value };
      }

      return field;
    });

    setInputFields(newInputFields);
  };

  return (
    <div className="BG-container">
      <div className="user-container">
        <h2>Update user info</h2>

        <form onSubmit={handleSave}>
          {inputFields.map((field) => (
            <div key={field.id} className="form-field">
              <label htmlFor={field.label}>
                {field.label.charAt(0).toUpperCase() + field.label.slice(1)}
              </label>
              <div className="input-container">
                <input
                  type="text"
                  id={field.label}
                  className="input1"
                  value={field.value}
                  onChange={(e) => handleChange(e, field.id)}
                  readOnly={field.label === "phonenumber"}
                />
                {field.error && <div className="error-message">{field.error}</div>}
              </div>
            </div>
          ))}
          <button type="submit" className="button">Save</button>
        </form>
        <a><MdOutlinePhoneIphone size={22} /> : {phoneNumber}</a>
      </div>
      <BottomBar />
    </div>
  );
};

export default User;
