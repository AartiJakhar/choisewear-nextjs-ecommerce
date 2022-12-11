import Image from 'next/image';
import Link from 'next/link';
import React, { useRef ,useEffect} from 'react'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import {BsFillBagCheckFill} from "react-icons/bs"
export default function Navbar({addToCart,cart,removeFromCart,}:any) {
  const ref: any = useRef()
  useEffect(() => {
    // addToCart()
    if(cart.length!==0){
      console.log(Object.keys(cart))

    }
  }, [cart])
  
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
        <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" onClick={toggleCart}>Cart<AiOutlineShoppingCart />

        </button>
      </div>
      <div ref={ref} className="sidecart absolute right-0 top-0 bg-pink-100 p-10 transition-transform translate-x-full">
        <h2 className='font-bold text-xl  text-center'>Shoping Cart</h2>
        <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl  "><AiFillCloseCircle /></span>
        <ol className='list-decimal font-semibold'>
         { Object.keys(cart).length===0 && <div>no items in the cart</div>}
         {Object.keys(cart).length!==0 &&Object.keys(cart).map((item:any)=>{
          return  <li key={item}>
            <div className="item flex my-5">
              <div className="w-2/3 font-semibold ">Tshirts - wear the code {cart[item].name}</div>
              <div className="flex font-semibold items-center justify-center w-1/3 text-lg ">
                <AiFillMinusCircle onClick={()=>{removeFromCart(item , 1,cart[item].price,cart[item].name,cart[item].size,cart[item].variant)}}  className='cursor-pointer text-pink-500' />
                <span className='mx-2'>{cart[item].qty}</span>
                <AiFillPlusCircle onClick={()=>{addToCart(item , 1,cart[item].price,cart[item].name,cart[item].size,cart[item].variant)}}/>
              </div>
            </div>
          </li>
         })
         }
        </ol>
        <div className='flex justify-around'>
            <button className='flex mt-16 text-white bg-pink-500 border-0 py-2 px-1 focus:outline-none hover:bg-pink-500 rounded text-sm'> <BsFillBagCheckFill className='m-1'/> Check Out</button>
        <button className='flex mt-16 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-500 rounded text-sm'>Clear Cart</button> 
        </div>
     
      </div>
    </header>
  )
}
