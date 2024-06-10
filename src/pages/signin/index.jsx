import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import OtpVerification from "../../components/otpVerification";
import accountExistanceCheck from "../../utils/account_existance_check";
import Image from "next/image";
import Logo from "@/assets/logo.jpg";

function Signin() {
  const [modalContent, setModalContent] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [otpVerificationView, setOtpVerificationView] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setEmail(session.user.email || "");
      setName(session.user.name || "");
      console.log(session);
      if (session.accessToken) {
        axios
          .get(
            "https://people.googleapis.com/v1/people/me?personFields=birthdays,genders,phoneNumbers",
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          )
          .then((response) => {
            const user = response.data;

            if (user.birthdays && user.birthdays.length > 0) {
              const birthday = user.birthdays[0].date;
              const formattedMonth = String(birthday.month).padStart(2, "0");
              const formattedDay = String(birthday.day).padStart(2, "0");
              const formattedDob = `${birthday.year}-${formattedMonth}-${formattedDay}`;
              setDob(formattedDob);
            }

            if (user.phoneNumbers && user.phoneNumbers.length > 0) {
              setPhone(user.phoneNumbers[0].value);
            }

            if (user.genders && user.genders.length > 0) {
              const genderValue = user.genders[0].value;
              setGender(
                genderValue.charAt(0).toUpperCase() + genderValue.slice(1)
              );
            }
          })
          .catch((error) => {
            console.error("Error fetching additional user info:", error);
          });
      }
    }
  }, [session]);

  const fieldsVerification = () => {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      dob === "" ||
      password.trim() === "" ||
      rePassword.trim() === "" ||
      gender.trim() === ""
    ) {
      if (name.trim() === "") {
        const element = document.getElementById("name");
        element.className =
          "border border-solid border-red-500 shadow-md px-6 py-2 rounded-lg w-full";
      } else {
        const element = document.getElementById("name");
        element.className =
          "border border-solid border-black shadow-md px-6 py-2 rounded-lg w-full";
      }
      if (email.trim() === "") {
        const element = document.getElementById("email");
        element.className =
          "border border-solid border-red-500 shadow-md px-6 py-2 rounded-lg mt-5 w-full";
      } else {
        const element = document.getElementById("email");
        element.className =
          "border border-solid border-black shadow-md px-6 py-2 rounded-lg mt-5 w-full";
      }
      if (phone.trim() === "") {
        const element = document.getElementById("phone");
        element.className =
          "border border-solid border-red-500 shadow-md px-6 py-2 rounded-lg mt-5 w-full number-field";
      } else {
        const element = document.getElementById("phone");
        element.className =
          "border border-solid border-black shadow-md px-6 py-2 rounded-lg mt-5 w-full";
      }
      if (dob === "") {
        const element = document.getElementById("dob");
        element.className =
          "border border-solid border-red-500 shadow-md px-6 py-2 rounded-lg mt-5 w-full";
      } else {
        const element = document.getElementById("dob");
        element.className =
          "border border-solid border-black shadow-md px-6 py-2 rounded-lg mt-5 w-full";
      }
      if (gender.trim() === "") {
        const element = document.getElementById("gender");
        element.className =
          "border border-solid border-red-500 shadow-md px-6 py-2 rounded-lg mt-5 w-full";
      } else {
        const element = document.getElementById("gender");
        element.className =
          "border border-solid border-black shadow-md px-6 py-2 rounded-lg mt-5 w-full";
      }
      if (password.trim() === "") {
        const element = document.getElementById("password");
        element.className =
          "border border-solid shadow-md border-red-500 px-6 py-2 rounded-lg mt-3 w-full";
      } else {
        const element = document.getElementById("password");
        element.className =
          "border border-solid shadow-md border-black px-6 py-2 rounded-lg mt-3 w-full";
      }
      if (rePassword.trim() === "") {
        const element = document.getElementById("rePassword");
        element.className =
          "border border-solid shadow-md border-red-500 px-6 py-2 rounded-lg mt-5 w-full";
      } else {
        const element = document.getElementById("rePassword");
        element.className =
          "border border-solid shadow-md border-black px-6 py-2 rounded-lg mt-5 w-full";
      }
      return "Please fill in all the fields.";
    }

    if (password !== rePassword) {
      return "Passwords do not match.";
    }

    if (password.length < 8) {
      return "Password must contain at least 8 characters.";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least 1 lower case alphabet.";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least 1 upper case alphabet.";
    }

    if (!/[0-9]/.test(password)) {
      return "Password must contain at least 1 numeral digit.";
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return "Password must contain at least 1 special character.";
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldValidation = fieldsVerification();
    const account_exist = await accountExistanceCheck(email, phone);
    if (fieldValidation === true) {
      if (account_exist !== false) {
        setModalContent(account_exist);
        setModalVisible(true);
        return;
      } else {
        setOtpVerificationView(true);
      }
    } else {
      setModalContent(fieldValidation);
      setModalVisible(true);
      setOtpVerificationView(false);
    }
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
                id="name"
                value={name}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (/^[a-zA-Z\s]*$/.test(inputValue)) {
                    setName(inputValue);
                  }
                }}
                type="text"
                placeholder="Enter name"
                className="border border-solid border-black shadow-md px-6 py-2 rounded-lg w-full"
              />
              <input
                id="email"
                value={email}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/\s/g, "");
                  setEmail(newValue);
                }}
                type="email"
                placeholder="Enter email"
                className="border border-solid border-black shadow-md px-6 py-2 rounded-lg mt-5 w-full"
              />
              <input
                id="phone"
                value={phone}
                onChange={(e) => {
                  const formattedPhone = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);
                  setPhone(formattedPhone);
                }}
                type="text"
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
                  id="dob"
                  value={dob}
                  placeholder="Enter DOB"
                  type="date"
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                  className="ml-2 px-4 py-2 border border-solid border-gray-300 shadow-md rounded-lg w-3/5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="border border-solid border-black shadow-md px-6 py-2 rounded-lg mt-5 w-full"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              <div className="mt-5">
                <h1 className="text-lg text-black font-bold ml-2">
                  Password constraints:
                </h1>
                <ul className="text-gray-600 text-sm ml-8 list-disc">
                  <li>Contains at least 8 characters.</li>
                  <li>Contains at least 1 upper case alphabet.</li>
                  <li>Contains at least 1 lower case alphabet.</li>
                  <li>Contains at least 1 numeral digit.</li>
                  <li>Contains at least 1 special character.</li>
                </ul>
              </div>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter password"
                className="border border-solid shadow-md border-black px-6 py-2 rounded-lg mt-3 w-full"
              />
              <input
                id="rePassword"
                value={rePassword}
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
                onClick={() => signIn("google", { callbackUrl: "/signin" })}
                type="button"
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
          {modalVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-xl font-semibold mb-4">{modalContent}</h1>
                <button
                  onClick={() => setModalVisible(false)}
                  className="text-blue-500 font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <OtpVerification
          OTPpath={"email"}
          text="Enter the OTP sent to your email."
          VerificationType="account"
          conffetti={true}
          data={{
            name: name,
            password: rePassword,
            email: email,
            phone_number: phone,
            dob: dob,
            gender: gender,
          }}
        />
      )}
    </Layout>
  );
}

export default Signin;
