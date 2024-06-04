import Layout from '@/components/layout/Layout'
import React, { useState } from 'react'
import Image from "next/image";
import Logo from "@/assets/logo.jpg";


function Profile() {
  const [name, setName] = useState("Aviral");
  const [phoneNumber, setPhoneNumber] = useState("9291932942");
  const [email, setEmail] = useState("aviralshastri01042005@gmail.com");

  return (
    <Layout title='Profile' navbar={false}>
      <div className='flex w-full sm:min-h-screen sm:mt-0 mt-5 justify-center items-center'>
        <div className='flex w-full sm:w-2/5 justify-center items-center mx-2 mt-4 p-4 pt-8 border shadow-lg border-solid border-black rounded-xl'>
          <div className='flex w-full flex-col justify-center items-center '>
            <div>
              <Image
                src={Logo}
                alt="Logo"
                width={150}
                height={150}
                className="rounded-xl items-center justify-center mt-6 mb-10 shadow-lg"
              />
            </div>
            <div><h1 className='text-4xl font-semibold tracking-wide'>Profile</h1></div>
            <form className='flex flex-col space-y-4 w-full px-1 mt-8'>
              <div className='flex flex-row border border-solid shadow-lg border-black py-4 rounded-lg space-x-1'>
                <h1 className='text-xl font-semibold mx-3'>Name</h1>
                <div className='border border-solid border-gray-600'></div>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='text-xl px-4 focus:outline-none w-full rounded-lg' />
              </div>
              <div className='flex flex-row border border-solid shadow-lg border-black py-4 rounded-lg space-x-1'>
                <h1 className='text-xl font-semibold mx-3'>Phone.No</h1>
                <div className='border border-solid border-gray-600'></div>
                <input type='text' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className='text-xl px-4 focus:outline-none w-full rounded-lg' />
              </div>
              <div className='flex flex-row border border-solid shadow-lg border-black py-4 rounded-lg space-x-1'>
                <h1 className='text-xl font-semibold mx-3'>Email</h1>
                <div className='border border-solid border-gray-600'></div>
                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} className='text-xl px-4 focus:outline-none w-full rounded-lg' />
              </div>
            </form>
          </div>
        </div> 
      </div>
    </Layout>
  )
}

export default Profile
