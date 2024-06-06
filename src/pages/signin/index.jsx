import Link from "next/link";
import { useState, useRef } from "react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import OtpVerifiaction from "../../components/otpVerification";
import Image from "next/image";
import Logo from "@/assets/logo.jpg";

function Signin() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [otpVerificationView, setOtpVerificationView] = useState(false);

  function generateOtp() {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOtpVerificationView(true);
  };

  return (
    <Layout navbar={false} title="Hydrate Sign-in">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
          rel="stylesheet"
        />
      </Head>
      {!otpVerificationView ? (
        <div className="sm:min-h-screen h-full bg-gray-100 flex items-center justify-center flex-col sm:pt-24 pt-0 pb-6">
          <div className="bg-white p-6 mt-10 sm:-mt-12 rounded-lg shadow-lg max-w-sm flex flex-col w-full items-center justify-center mx-4">
            <div>
              <Image
                src={Logo}
                alt="Logo"
                width={100}
                height={100}
                className="rounded-xl items-center justify-center mt-6 mb-10"
              />
            </div>
            <h1
              className="text-4xl text-center font-bold"
              style={{ fontFamily: '"Oswald", sans-serif' }}
            >
              Sign-In
            </h1>
            <form className="mt-10" onSubmit={handleSubmit}>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter name"
                className="border border-solid border-black shadow-md px-6 py-2 rounded-lg w-full"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email"
                className="border border-solid border-black shadow-md px-6 py-2 rounded-lg mt-5 w-full"
              />
              <input
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                placeholder="Enter Phone.No"
                maxLength={10}
                className="border border-solid border-black shadow-md px-6 py-2 rounded-lg mt-5 w-full number-field"
              />
              <div className="bg-white border border-solid border-black shadow-md rounded-lg mt-5 flex flex-row w-full items-center p-4">
                <h1 className="text-lg text-gray-700 font-semibold w-2/5">
                  Date of Birth
                </h1>
                <div className="h-10 border border-solid border-gray-300 rounded-xl mx-4 flex-grow"></div>
                <input
                  placeholder="Enter DOB"
                  type="date"
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                  className="ml-2 px-4 py-2 border border-solid border-gray-300 shadow-md rounded-lg w-3/5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mt-5">
                <h1 className="text-lg text-black font-bold ml-2">
                  Password constraints:
                </h1>
                <ul className="text-gray-600 text-sm ml-8 list-disc">
                  <li>Contains atleast 8 characters.</li>
                  <li>Contains atleast 1 upper case alphabet.</li>
                  <li>Contains atleast 1 lower case alphabet.</li>
                  <li>Contains atleast 1 numeral digit.</li>
                  <li>Contains atleast 1 special character.</li>
                </ul>
              </div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter password"
                className="border border-solid shadow-md border-black px-6 py-2 rounded-lg mt-3 w-full"
              />
              <input
                onChange={(e) => {
                  setRePassword(e.target.value);
                }}
                type="password"
                placeholder="Re-Enter password"
                className="border border-solid shadow-md border-black px-6 py-2 rounded-lg mt-5 w-full"
              />
              <h1
                className={`text-red-600 ml-2 font-normal ${
                  password === rePassword ? "hidden" : ""
                }`}
              >
                Password does not match.
              </h1>
              <h1 className="text-center text-xl font-semibold mt-2">or</h1>
              <button
                className="items-center justify-center mt-4 mb-2 text-black border bg-gray-50 border-black border-solid py-2 w-full rounded-full"
              >
                <div className="flex flex-row items-center space-x-2 justify-center">
                  <FcGoogle size={25} />
                  <h1 className="font-bold text-lg">
                    Import details from Google
                  </h1>
                </div>
              </button>
              <div className="flex flex-row">
                <button
                  type="submit"
                  className="w-full items-center justify-center mt-6 mb-2 text-white bg-black py-2 rounded-lg"
                >
                  <div className="flex flex-row items-center justify-center">
                    <h1 className="font-bold text-lg">Create account</h1>
                  </div>
                </button>
              </div>
            </form>
          </div>
          <div className="bg-white p-4 mt-4 rounded-lg shadow-lg max-w-sm w-full items-center justify-center mx-4 flex flex-row">
            <h1 className="text-center text-lg">Already existing user?</h1>
            <Link
              href="/login"
              className="text-blue-700 text-lg font-semibold ml-2 hover:underline text-center items-center justify-center"
            >
              <h1 className="text-center">Login</h1>
            </Link>
          </div>
        </div>
      ) : (
        <OtpVerifiaction
          text="Enter the OTP sent to your email."
          OTP={generateOtp()}
          VerificationType="account"
          conffetti={true}
          data={{ name: name, password: rePassword, email: email,  phone_number: phone,dob:dob }}
        />
      )}
    </Layout>
  );
}

export default Signin;
