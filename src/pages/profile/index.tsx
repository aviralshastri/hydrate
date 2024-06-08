import Layout from "@/components/layout/Layout";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/logo.jpg";
import { FaCartShopping } from "react-icons/fa6";
import { RiAccountCircleFill,RiLogoutCircleRLine } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import Link from "next/link";

function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handle_logout = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const confirm_logout = () => {
    setIsModalOpen(false);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
      window.location.href = "/login";
    }, 1000);
  };

  const cancel_logout = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout navbar={false}>
      <div className="flex w-full sm:min-h-screen sm:mt-0 mt-5 justify-center items-center">
        <div className="flex w-full lg:w-4/12 md:w-6/12  sm:w-3/12 justify-center items-center mx-2 mt-4 p-4 pt-8 border shadow-xl border-solid border-black rounded-xl">
          <div className="flex w-full flex-col justify-center items-center ">
            <div>
              <Image
                src={Logo}
                alt="Logo"
                width={150}
                height={150}
                className="rounded-xl items-center justify-center mt-6 mb-10 shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-4xl font-semibold tracking-wide">Profile</h1>
            </div>
            <form className="flex flex-col space-y-4 w-full px-1 mt-8">
              <Link
                href={"/profile/account"}
                className="border border-solid shadow-xl text-center flex flex-row items-center justify-center bg-black text-white border-black py-4 rounded-lg space-x-1"
              >
                <RiAccountCircleFill size={40} />
                <h1 className="text-2xl font-semibold text-center px-2">
                  Account
                </h1>
              </Link>
              <Link
                href={"/orders"}
                className="border border-solid shadow-xl flex flex-row items-center justify-center text-center bg-black text-white border-black py-4 rounded-lg space-x-1"
              >
                <FaCartShopping size={30} />
                <h1 className="text-2xl font-semibold text-center px-2">
                  My Orders
                </h1>
              </Link>
              <Link
                href={"/profile/settings"}
                className="border border-solid shadow-xl text-center flex flex-row items-center justify-center bg-black text-white border-black py-4 rounded-lg space-x-1"
              >
                <IoSettings size={30} />
                <h1 className="text-2xl font-semibold text-center px-2">
                  Settings
                </h1>
              </Link>
              <button
                onClick={handle_logout}
                className="border border-solid shadow-xl text-center flex flex-row items-center justify-center bg-red-700 text-white border-red-700 py-4 rounded-lg space-x-1"
              >
                <h1 className="text-2xl font-semibold text-center px-2">
                  Logout
                </h1>
                <RiLogoutCircleRLine size={30} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancel_logout}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirm_logout}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {isToastVisible && (
        <div className="fixed bottom-4 left-4 right-4 max-w-sm mx-auto flex flex-row items-center justify-between bg-green-500 text-white p-4 rounded-lg shadow-2xl">
          <h1 className="">Logging out</h1>
          <div className="loader ml-2"></div>
        </div>
      )}
    </Layout>
  );
}

export default Profile;
