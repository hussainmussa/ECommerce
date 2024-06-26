import { useState } from "react";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import './PhoneAuth.css'; 

const PhoneAuth = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [showErrormsg, setshowErrormsg] = useState(false);
  
  function onCaptchVerify() {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        setLoading(true);
        const appVerifier = window.recaptchaVerifier;
        const formatPh = "+" + ph;
        signInWithPhoneNumber(auth, formatPh, appVerifier)
          .then((confirmationResult) => {
            setLoading(false);
            setShowOTP(true);
            window.confirmationResult = confirmationResult;
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }
    });
  };
  
  function onSignup() {
    const formatPh = "+" + ph;
  
    // Check if the phone number is valid for the selected country
    if (formatPh !== "+16505554567" && !phoneIsValid()) {
      alert("Please enter a valid phone number for the selected country.");
      return;
    }
    
    // Proceed with sign up
    onCaptchVerify();
    setLoading(true);
    const appVerifier = window.recaptchaVerifier;
    
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        setLoading(false);
        setShowOTP(true);
        window.confirmationResult = confirmationResult;
      }).catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  
  // Function to check if the phone number is valid for the selected country
  function phoneIsValid() {
    const phoneNumber = ph;
    const country = 'il'; // Change to the appropriate country code
    const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
    try {
      const number = phoneUtil.parse(phoneNumber, country);
      return phoneUtil.isValidNumberForRegion(number, country);
    } catch (error) {
      return false;
    }
  }
  
  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult.confirm(otp).then((result) => {
      // User signed in successfully.
      console.log(result);
      setUser(result.user);
      setLoading(false);
      const phoneNumber = result.user.phoneNumber;
      console.log("Phone number:", phoneNumber);
      window.location.href = '/home';
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      console.log(error);
      setLoading(false);
      setshowErrormsg(true);
    });
  };
  
  return (
    <div className="BG-container">
      {user ? (
        <h2>Login Success</h2>
      ) : (
        <div className="phone-auth-content">
          {showOTP ? (
            <>
              <h1 >Verification</h1>
              <p >Enter the code sent to your phone number</p>
              <OtpInput
                value={otp}
                onChange={setOtp}
                OTPLength={6}
                otpType="number"
                disabled={false}
                autoFocus
              ></OtpInput>
              <button onClick={onOTPVerify} disabled={loading} className="button-auth ">
                {loading ? 'Loading...' : 'Verify OTP'}
              </button>
              {showErrormsg ? (
                <label className="error-message">Wrong code</label>
              ) : null}
            </>
          ) : (
            <>
              <h1 className="register-label">Register</h1>
              <p className="registration-text">Add your phone number, We'll send you a verification code</p>
              <PhoneInput country={"il"} value={ph} onChange={setPh} className="phone-input-label" placeholder="Enter your phone number" />
              <button onClick={onSignup} disabled={loading} className="button-auth ">
                {loading ? 'Loading...' : 'Send code via SMS'}
              </button>
            </>
          )}
          <div id="recaptcha-container"></div>
        </div>
      )}
    </div>
  );
};

export default PhoneAuth;
