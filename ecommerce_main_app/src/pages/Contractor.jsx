import React, { useRef } from "react";
import {firestore } from "../firebase";
import {addDoc,collection} from "@firebase/firestore";


const Contracter = () => {
    const messageRef=useRef();
    const ref =collection(firestore,"phonenumbers");


    const handleSave = async(e) => {
        e.preventDefault();
        console.log(messageRef.current.value);
        
        let data={
            message:messageRef.current.value,
        };
        try{
            addDoc(ref,data)
        }
        catch{
            console.log(e);
        }   
    };
    
    return ( 
    <div>
        <form onSubmit={handleSave}>
            <label> Enter your number    </label>
            <input type ="text"  ref={messageRef}/>
            <button type="submit">Save now</button>
        </form>
    </div>
);
}

export default Contracter;