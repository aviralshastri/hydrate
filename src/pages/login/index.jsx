import Link from "next/link";
import { useState } from "react";
import React from "react";
import { RiLoginCircleLine } from "react-icons/ri";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import login from "../../utils/login";
import Image from "next/image";
import Logo from "@/assets/logo.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credCheck, setCredCheck] = useState(true);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastText, setToastText] = useState("");
  const [toastColor, setToastColor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isAuthenticated = await login(email, password);
      if (isAuthenticated) {
        setToastText("Logging in");
        setToastColor("bg-green-600");
        setIsToastVisible(true);
        setCredCheck(true);
        setTimeout(() => {
          setIsToastVisible(false);
          window.location.href = "/";
        }, 1500);
      } else {
        setCredCheck(false);
        setToastText("Login failed. Please try again.");
        setToastColor("bg-red-600");
        setIsToastVisible(true);
        setTimeout(() => {
          setIsToastVisible(false);
        }, 1000);
      }
    } catch (error) {
      console.error("An error occurred during authentication:", error);
      setCredCheck(false);
      setToastText(
        "An error occurred during authentication. Please try again."
      );
      setToastColor("bg-red-600");
      setIsToastVisible(true);
      setTimeout(() => {
        setIsToastVisible(false);
      }, 2000);
    } finally {
      return;
    }
  };

  return (
    <Layout navbar={false} title="Hydrate Login">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="sm:min-h-screen bg-gray-100 flex items-center justify-center flex-col  pb-6">
        <div className="bg-white p-6 mt-10 sm:-mt-24 rounded-lg shadow-lg max-w-sm flex flex-col w-full items-center justify-center mx-4">
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
            className="text-5xl text-center font-bold"
            style={{ fontFamily: '"Oswald", sans-serif' }}
          >
            Login
          </h1>

          <form className="mt-10" onSubmit={handleSubmit}>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
                e.preventDefault();
              }}
              value={email}
              type="text"
              placeholder="Enter email"
              className="border border-solid border-black px-6 py-2 rounded-lg w-full"
            />
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                e.preventDefault();
              }}
              type="password"
              placeholder="Enter password"
              className="border border-solid border-black px-6 py-2 rounded-lg mt-5 w-full"
            />
            <Link
              href={"/"}
              className="text-sm text-left mt-4 text-blue-700 underline ml-1"
            >
              forgot password?
            </Link>
            <div className="flex flex-row">
              <button className="w-full items-center justify-center mt-6 mb-2 text-white bg-black py-2 rounded-lg">
                <div className="flex flex-row items-center space-x-4 justify-center">
                  <h1 className="font-bold text-lg">Login</h1>
                  <RiLoginCircleLine size={30} />
                </div>
              </button>
            </div>
            <h1
              className={`text-red-500 ml-2 font-semibold text-center ${
                credCheck ? "hidden" : ""
              }`}
            >
              Incorrect Email or Password.
            </h1>
          </form>
        </div>
        <div className="bg-white p-4 mt-4 rounded-lg shadow-lg max-w-sm w-full items-center justify-center mx-4 flex flex-row">
          <h1 className="text-center text-lg">New to our website ?</h1>
          <Link
            href={"/signin"}
            className="text-blue-700 text-lg font-semibold ml-2 hover:underline text-center items-center justify-center"
          >
            <h1 className="text-center">Create account</h1>
          </Link>
        </div>
      </div>
      {isToastVisible && (
        <div
          className={`fixed bottom-4 left-4 right-4 max-w-sm mx-auto flex flex-row items-center justify-between ${toastColor} text-white p-4 rounded-lg shadow-2xl`}
        >
          <h1 className="">{toastText}</h1>
        </div>
      )}
    </Layout>
  );
}

export default Login;
