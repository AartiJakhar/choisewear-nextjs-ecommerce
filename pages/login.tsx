import Link from 'next/link'
import {useRouter} from 'next/router';
import React, { useState ,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {
   const router=useRouter();
    const [credentials, setCredentials] = useState({name:"",email:"",password:""})
    const onChangeCredentials=(e:any)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
       
  }
    const logIn=async(e:any)=>{
    e.preventDefault()
    let data = await fetch('http://localhost:3000/api/signin',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:credentials.email,password:credentials.password})
      })
      const userData=await data.json()
   if( !userData.success){
   
        toast.error('Invalid credentials', {
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
        localStorage.setItem('token',userData.authtoken)
            setTimeout(() => {
                router.push('http://localhost:3000')
            }, 2000);
    toast.success('🦄 You have Created Your account', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setCredentials({name:"",email:"",password:""})
  
}
 
    }
    useEffect(() => {
        if(localStorage.getItem('token')){
       router.push('/')
        }
    }, [router])
    
  return (
<section className="bg-white-50 dark:bg-white-900">
       {/* our toastify component */}
       <ToastContainer/>
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-pink-900 dark:text-black">
          <img className="w-14  mr-2" src="/logo.png" alt="logo"/>
          Choice Wear   
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-pink-900 md:text-2xl dark:text-black">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="post" onSubmit={logIn} >
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-pink-900 dark:text-black">Your email</label>
                      <input type="email" name="email" id="email" value={credentials.email} required onChange={onChangeCredentials} className="bg-white-50 border border-gray-300 text-pink-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                  </div>
                  <div>
                      <label htmlFor="password"  className="block mb-2 text-sm font-medium text-pink-900 dark:text-black">Password</label>
                      <input type="password" value={credentials.password} required minLength={5}  onChange={onChangeCredentials} name="password" id="password" placeholder="••••••••" className="bg-white-50 border border-gray-300 text-pink-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  {/* <div className="flex items-center justify-between">
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div> */}
                  <button type="submit" className="w-full text-white bg-pink-900  hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p className="text-sm font-light text-pink-900 dark:text-pink-800">
                      Don’t have an account yet? <Link href={'/signup'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}
