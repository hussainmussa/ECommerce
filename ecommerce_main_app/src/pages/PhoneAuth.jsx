import { useState } from "react";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import './PhoneAuth.css'; // Import your CSS file for styling

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
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignup();
        }
      });
  };
 
  function onSignup() {
    onCaptchVerify();
    setLoading(true);
    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;
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
    <div>
      {user ? (
        <h2>Login Success</h2>
      ) : (
        <div>
          <h1>Welcome to CODE A PROGRAM</h1>
          {showOTP ? (
            <>
              
              <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container"
                ></OtpInput>
              <button onClick={onOTPVerify} disabled={loading}>
                {loading ? 'Loading...' : 'Verify OTP'}
              </button>
              
              {showErrormsg ?(
                <>
                    <label>Wrong code</label>
                </>

              ):
              <>
               
              </>
                
              }
            </>
           
            
          ) : (
            <>
              <label>Verify your phone number </label>
             
              <PhoneInput country={"il"} value={ph} onChange={setPh} />
              <button onClick={onSignup} disabled={loading}>
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