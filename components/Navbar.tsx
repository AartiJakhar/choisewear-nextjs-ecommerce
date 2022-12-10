import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
export default function Navbar() {
  return (
    <header className="text-gray-600 md:pb-0 pb-2 body-font shadow-xl sticky bg-white top-0 z-10">

    <div className="container mx-auto flex flex-wrap  flex-col md:flex-row items-center">
      <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
    <Image height={10} width={80} src={"/logo.png"} alt="codeswear"></Image>
      
      </a>
      <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
        <Link href={"/items/tshirts"} className="mr-5 hover:text-gray-900">Tshirts</Link>
        <Link href={"/items/hoodies"} className="mr-5 hover:text-gray-900">Hoodies</Link>
        <Link href={"/items/mugs"} className="mr-5 hover:text-gray-900">Mugs</Link>
        <Link href={"/items/stickers"} className="mr-5 hover:text-gray-900">Stickers</Link>
      </nav>
      <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Cart<AiOutlineShoppingCart />
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </header>
  )
}
