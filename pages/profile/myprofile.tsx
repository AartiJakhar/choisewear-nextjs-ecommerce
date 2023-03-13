import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import {FaUserCircle} from 'react-icons/fa';
export default function Myprofile() {
  const [credentials, setCredentials] = useState<any>({ name: "", email: "", address: "", phone: "", pincode: "", password: "", newpassword: "", cpassword: "" })
  //onchange function for form
  const changeCredentials = (e: any) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const ChangePassword = async (e: any) => {
    e.preventDefault()

    let data = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/profile/cpassword`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token') as any,
      },
      body: JSON.stringify({ newpassword: credentials.newpassword, password: credentials.password, cpassword: credentials.cpassword })
    })
    const response = await data.json()
    const { success, error } = response
    if (success && !error) {
      toast.success('🦄 You have changed password successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setCredentials({...credentials, password: "", newpassword: "", cpassword: "" })
    } else {
      toast.error(`${error}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  const getUser = async () => {
    let data = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/profile/getuser`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token') as any,
        "email": localStorage.getItem('email') as any,
      }
    })
    const response = await data.json()
    if (response.success) {
      setCredentials({ name: response.user.name, email: response.user.email, address: response.user.address, phone: response.user.phone, pincode: response.user.pincode })
    }
  }
  const updateUserDetails = async (e: any) => {
    e.preventDefault()

    let data = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/profile/updateuser`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token') as any,
          "email": localStorage.getItem('email') as any,
      },
      body: JSON.stringify({ name: credentials.name, phone: credentials.phone, pincode: credentials.pincode, address: credentials.address })
    })
    const response = await data.json()
   if(response.success) {
    toast.success('🦄 You have Changed Your Details successfully', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
   }else{
    toast.error(response.error + " please login again", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
   }
  }


  useEffect(() => {
    getUser()

  }, [])

  return (
    <div className='p-3 md:p-32 px-10 bg-gray-100  max-lg:py-20'>

      <h1 className='font-bold text-3xl my-8 text-center'>Profile</h1>
      <div className='my-10 shadow-lg bg-white py-10  rounded-lg flex md:flex-row flex-col flex-wrap'>
        <div className="flex justify-center flex-col md:w-1/3 items-center md:border-r-2 border-solid border-gray-300">
      <FaUserCircle className='text-9xl text-gray-800 shadow-sm'/>
      <h3 className='text-3xl bold space-x-2 leading-10 py-3 text-gray-800'>{credentials.name}</h3>
        </div>
        <div className='px-4 md:w-[66.33%] w-full'>
        <div className="border-b-[3px] border-double border-gray-300 max-md:py-3  h-1/2">
         <h4 className='text-gray-700 text-2xl leading-10'>Address </h4>
         <p className='text-gray-800'>{credentials.address?credentials.address:" _ _" }</p>
        </div>
        <div className="border-b-[3px] border-double  h-1/2">
         <h4 className='text-gray-700 text-2xl leading-10'>details </h4>
         <p className='text-gray-800'>{credentials.email?credentials.email:" _ _" }</p>
         <p className='text-gray-800'>{credentials.phone?credentials.phone:" _ _" }</p>
        </div>
        </div>
      </div>
      <div className='bg-white shadow-lg p-10 rounded-lg'>
        <h2 className='font-bold text-xl my-4'>1. Delivery Details</h2>
        <form action="post" onSubmit={updateUserDetails}>
          <div className="px-4  md:w-3/4 sm:w-full lg:w-3/4   flex justify-between max-md:flex-col ">
            <div className=" mb-4 ">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">name</label>
              <input required type="text" value={credentials.name} onChange={changeCredentials} id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input required type="email" value={credentials.email} readOnly id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div> </div>
          <div className=" px-4  md:w-3/4 sm:w-full lg:w-3/4  mb-4">
            <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
            <textarea required id="address" placeholder='Set Your Address' value={credentials.address} onChange={changeCredentials} name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="px-4  md:w-3/4 sm:w-full lg:w-3/4  flex justify-between  max-md:flex-col">
            <div className=" md:w-[42vh]mb-4">
              <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
              <input type="number" placeholder='10-digit number' required value={credentials.phone} onChange={changeCredentials} id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="  md:w-[42vh] mb-4">

              <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
              <input type="number" placeholder='112233' required value={credentials.pincode} onChange={changeCredentials} id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <button type="submit" className="w-44 text-white bg-pink-900  hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>

        </form>

      </div>
      <div className='bg-white shadow-lg p-10 rounded-lg my-10'>
        <h2 className='font-bold text-xl my-4'>1. Change Password</h2>
        <form action="post" onSubmit={ChangePassword}>
          <div className="px-4  md:w-3/4 sm:w-full lg:w-3/4   flex justify-between ">
            <div className=" md:w-[42vh] mb-4">
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
              <input required type="password" value={credentials.password} onChange={changeCredentials} id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>

          <div className="px-4  md:w-3/4 sm:w-full lg:w-3/4  flex justify-between  max-md:flex-col">
            <div className=" md:w-[42vh] mb-4">
              <label htmlFor="newpassword" className="leading-7 text-sm text-gray-600">New Password</label>
              <input required type="password" value={credentials.newpassword} onChange={changeCredentials} id="newpassword" name="newpassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className=" md:w-[42vh] mb-4 ">

              <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">Confirm Password</label>
              <input type="password" required value={credentials.cpassword} onChange={changeCredentials} id="cpassword" name="cpassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <button type="submit" className="w-44 text-white bg-pink-900  hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>

        </form>
      </div>

    </div>
  )
}
