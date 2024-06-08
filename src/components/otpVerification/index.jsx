import React, { useState, useRef, useEffect, use } from "react";
import { PiPasswordFill } from "react-icons/pi";
import { FaLongArrowAltRight } from "react-icons/fa";
import Link from "next/link";
import Lottie from "lottie-react";
import tickAnimation from "@/assets/tickanimation.json";
import ConfettiExplosion from "react-confetti-explosion";
import createAccount from "../../utils/create_account";
import { sendEmailVerification } from "../../utils/otp_verification";

function generateOTP() {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

async function sendOTP(OTPpath, email, phone_number) {
  let OTP = "";
  if (OTPpath === "email" && email) {
    OTP = generateOTP();
    await sendEmailVerification(OTP, email);
  } else if (OTPpath === "phone" && phone_number) {
    OTP = generateOTP();
  }
  return OTP;
}

function resendOTP() {
  const OTP = generateOTP();
  return OTP;
}

function OtpVerification({
  OTPpath,
  text,
  VerificationType,
  confetti = false,
  data,
}) {
  const [enteredOTP, setEnteredOTP] = useState(Array(6).fill(""));
  const [verificationView, setVerificationView] = useState(true);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputs = useRef([]);
  const [successText, setSuccessText] = useState(
    "Account Created Successfully!"
  );
  const [route, setRoute] = useState("");
  const [routeButtonText, setRouteButtonText] = useState("Go to home page");
  const [generatedOTP, setGeneratedOTP] = useState("");

  useEffect(() => {
    const fetchOTP = async () => {
      const otp = await sendOTP(OTPpath, data.email, data.phone_number);
      setGeneratedOTP(otp);
    };
  
    fetchOTP();
  }, []);

  const VerificationObjects = [
    {
      type: "account",
      successText: "Account Created Successfully!",
      route: "/",
      routeButtonText: "Go to home page",
    },
    {
      type: "password_reset",
      successText: "Password Reset Successful!",
      route: "/login",
      routeButtonText: "Go to login page",
    },
  ];

  useEffect(() => {
    if (VerificationType === "account") {
      setSuccessText(VerificationObjects[0].successText);
      setRoute(VerificationObjects[0].route);
      setRouteButtonText(VerificationObjects[0].routeButtonText);
    }
  }, [VerificationType]);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
      clearInterval(countdown);
    }

    return () => clearInterval(countdown);
  }, [timer]);

  const otpVerification = async (Otp) => {
    if (Otp.join("") === generatedOTP) {
      if (VerificationType === "account") {
        const create_account = await createAccount(
          data.name,
          data.password,
          data.email,
          data.phone_number,
          data.dob,
          data.gender
        );
        if (create_account) {
          setVerificationView(false);
        } else {
          alert("Account creation failed. Please try again.");
        }
      } else {
        alert("Wrong OTP! Please try again.");
      }
    }
  };

  const handleChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...enteredOTP];
      newOtp[index] = value;
      setEnteredOTP(newOtp);

      if (value !== "" && index < 5) {
        inputs.current[index + 1].focus();
      }
      if (value === "" && index > 0) {
        inputs.current[index - 1].focus();
      }
      if (value === "" && index === 0) {
        inputs.current[0].focus();
      }
      const currentLength = newOtp.filter((digit) => digit !== "").length;
      if (currentLength === 6) {
        setTimeout(() => {
          otpVerification(newOtp);
        }, 500);
      }
    }
  };

  const handleKeyDownInput = (index, event) => {
    if (event.key === "Backspace" && enteredOTP[index] === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleResendOTP = () => {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    setTimer(30);
    setIsResendDisabled(true);
    setGeneratedOTP(otp);
  };

  return (
    <>
      {verificationView ? (
        <div className="sm:min-h-screen h-full bg-gray-100 flex items-center justify-center flex-col sm:pt-24 pt-0 pb-6">
          <div className="bg-white p-6 mt-10 sm:mt-0 rounded-lg shadow-lg max-w-sm w-full items-center justify-center mx-4">
            <div className="flex items-center justify-center mb-4">
              <PiPasswordFill size={70} />
            </div>
            <h1
              className="text-4xl text-center font-bold mb-6"
              style={{ fontFamily: '"Oswald", sans-serif' }}
            >
              OTP Verification
            </h1>
            <h1 className="text-center text-gray-600 text-lg font-semibold">
              {text}
            </h1>
            <div className="mt-10 flex flex-row space-x-2 w-full items-center justify-center">
              {enteredOTP.map((digit, index) => (
                <input
                  key={index}
                  type="number"
                  className="border border-solid border-black rounded-lg px-3 py-2 w-12 text-center"
                  value={digit}
                  maxLength="1"
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDownInput(index, e)}
                  aria-label={`OTP ${index + 1}`}
                  ref={(el) => (inputs.current[index] = el)}
                />
              ))}
            </div>
            <button
              className="flex items-center justify-center mt-3 text-gray-800 px-2 w-full"
              onClick={handleResendOTP}
              disabled={isResendDisabled}
            >
              <h1 className="text-center text-sm">
                Didn't receive OTP? Resend OTP in ({timer})sec
              </h1>
            </button>
          </div>
        </div>
      ) : (
        <div className="sm:min-h-screen h-full bg-gray-100 flex items-center justify-center flex-col sm:pt-24 pt-0 pb-6">
          {confetti ? null : <ConfettiExplosion duration={5000} />}
          <div
            className={`bg-green-400 p-6 pb-10 mt-10 sm:mt-0 rounded-lg shadow-lg max-w-sm w-full items-center flex flex-col justify-center mx-4 ${
              verificationView ? "" : "success-card"
            }`}
          >
            <Lottie
              animationData={tickAnimation}
              loop={true}
              className="w-1/2 h-1/2"
            />
            <h1
              className="text-4xl text-center font-bold mb-6 text-white mt-4"
              style={{ fontFamily: '"Oswald", sans-serif' }}
            >
              {successText}
            </h1>
            <Link
              href={route}
              className="bg-white text-black rounded-full p-4 px-10 mt-2 hover:bg-gray-100"
            >
              <div className="flex flex-row justify-center items-center space-x-2">
                <h1 className="font-bold text-xl">{routeButtonText}</h1>
                <FaLongArrowAltRight size={30} className="mt-1" />
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default OtpVerification;
