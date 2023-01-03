import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from "react-icons/bs"
import { FaUserAlt } from "react-icons/fa"
export default function Navbar({ logOut,user, addToCart, cart, removeFromCart, clearCart }: any) {
  const ref: any = useRef()
  const [userdropdown, setUserdropdown] = useState(false)

  const toggleCart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.add('translate-x-full')
      ref.current.classList.remove('translate-x-0')
    }
  }
  return (
    <header className="text-gray-600 md:pb-0 pb-2 body-font shadow-xl sticky bg-white top-0 z-10">

      <div className="container mx-auto flex flex-wrap  flex-col md:flex-row items-center">
        <Link href={"/"} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <Image height={10} width={80} src={"/logo.png"} alt="codeswear"></Image>

        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link href={"/items/tshirts"} className="mr-5 hover:text-gray-900">Tshirts</Link>
          <Link href={"/items/hoodies"} className="mr-5 hover:text-gray-900">Hoodies</Link>
          <Link href={"/items/mugs"} className="mr-5 hover:text-gray-900">Mugs</Link>
          <Link href={"/items/stickers"} className="mr-5 hover:text-gray-900">Stickers</Link>
        </nav>

        <div>
          <button className=" mx-3 inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none  rounded text-base mt-4 md:mt-0 hover:bg-gray-300 hover:text-black" onClick={toggleCart}>Cart<AiOutlineShoppingCart />

          </button>
          {user.value!==null && user.value!='undefined'? <button onMouseOver={() => { setUserdropdown(true) }} onMouseLeave={() => { setUserdropdown(false) }} className=" inline-flex items-center bg-gray-200 border-0 py-2 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"> <FaUserAlt />
          </button> :
            <Link href={"/login"}>
              <button className='bg-gray-200  py-1 px-3 rounded focus:outline-none hover:bg-gray-300 hover:text-black'>Singin</button> </Link>}

        </div>
        <div onMouseOver={() => { setUserdropdown(true) }} onMouseLeave={() => { setUserdropdown(false) }}>

          {user.value && userdropdown &&
            <div className="absolute md:right-6  p-3 md:top-14 ">
              <div className='bg-pink-500 rounded text-white px-4 py-2 shadow-lg  border-black border-y border-solid cursor-pointer '>
                <ul>
                  <li className='hover:border-solid hover:border-x-blue-100 py-2 hover:border-b active:text-black'>Orders</li>
                  <li className='hover:border-solid hover:border-x-blue-100 py-2 hover:border-b active:text-black'>Profile</li>
                  <li className='hover:border-solid hover:border-x-blue-100 py-2 hover:border-b active:text-black' onClick={logOut}>Log out</li>
                </ul>
              </div> </div>}

        </div>
      </div>
      <div ref={ref} className={`sidecart h-[100vh]  overflow-auto absolute right-0 top-0 bg-pink-100 p-10 transition-transform ${Object.keys(cart).length === 0 ? "translate-x-full" : "translate-x-0"}`}>
        <h2 className='font-bold text-xl  text-center'>Shoping Cart</h2>
        <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl  "><AiFillCloseCircle /></span>

        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length === 0 && <div className='text-center my-1 text-red-600'>no items in the cart</div>}
          {Object.keys(cart).length !== 0 && Object.keys(cart).map((item: any) => {
            return <li key={item}>
              <div className="item flex my-5">
                <div className="w-2/3 font-semibold ">Tshirts - {cart[item].name} ({cart[item].variant}/{cart[item].size})</div>
                <div className="flex font-semibold items-center justify-center w-1/3 text-lg ">
                  <AiFillMinusCircle onClick={() => { removeFromCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].variant) }} className='cursor-pointer text-pink-500' />
                  <span className='mx-2'>{cart[item].qty}</span>
                  <AiFillPlusCircle onClick={() => { addToCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].variant) }} />
                </div>
              </div>
            </li>
          })
          }
        </ol>
        <div className='flex align-middle justify-between mt-3  flex-wrap  '>
          <Link href={"/checkout"}> <button className='flex my-3 text-white bg-pink-500 border-0 py-2 px-1 focus:outline-none hover:bg-pink-500 rounded text-sm'> <BsFillBagCheckFill className='m-1' /> Check Out</button></Link>
          <button className='my-3 mx-2  text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-500 rounded text-sm' onClick={clearCart}>Clear Cart</button>
        </div>

      </div>
    </header>

  )
}
