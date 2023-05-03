import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
      <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
        <Link  href={"/"} className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
       
          <Image height={10} width={80} src={"/logo.png"} alt="choicewear"></Image>

          <span className=" text-3xl">ChoiceWear</span>
        </Link>
      </div>
      <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">SHOP</h2>
          <nav className="list-none mb-10">
            <li>
              <Link href={"/items/tshirts"} className="text-gray-600 hover:text-gray-800">T-shirts</Link>
            </li>
            <li>
              <Link href={"/items/hoodies"} className="text-gray-600 hover:text-gray-800">Hoodies</Link>
            </li>
            <li>
              <Link href={"/items/mugs"} className="text-gray-600 hover:text-gray-800">Mugs</Link>
            </li>
            <li>
              <Link href={"/items/stickers"} className="text-gray-600 hover:text-gray-800">Stickers</Link>
            </li>
          </nav>
        </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CUSTOMER SERVICE</h2>
          <nav className="list-none mb-10">
            <li>
              <a className="text-gray-600 hover:text-gray-800">Contact Us</a>
            </li>
            <li>
              <a className="text-gray-600 hover:text-gray-800">About Us</a>
            </li>
            <li>
              <a className="text-gray-600 hover:text-gray-800">Return Policy</a>
            </li>
          </nav>
        </div>
        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">POLICY</h2>
          <nav className="list-none mb-10">
            <li>
              <a className="text-gray-600 hover:text-gray-800">Privecy Policy</a>
            </li>
            <li>
              <a className="text-gray-600 hover:text-gray-800">Terms and Conditions</a>
            </li>
           
          </nav>
        </div>
      
      </div>
    </div>
    <div className="bg-gray-200">
      <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
        <p className="text-gray-500 text-sm text-center sm:text-left">© 2023  Choicewear.com  - All Rights Reserved
        
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
          
          
          <a target="_blank" href="https://www.linkedin.com/in/aarti-jakhar-developer/" rel="noopener noreferrer" className="ml-3 text-gray-500">
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
              <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
              <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </a>
        </span>
      </div>
    </div>
  </footer>
  )
}
// mongodb+srv://vercel-admin-user:eTxnGgQQjf05lcjJ@cluster0.407b4mz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
