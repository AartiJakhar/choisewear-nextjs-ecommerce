import Link from 'next/link'
import React from 'react'
import {   AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
export default function checkout({addToCart,cart,removeFromCart,clearCart,subtotal}:any) {
console.log(cart)
  return (
    <div className='container m-auto'>
 <h1 className='font-bold text-3xl my-8 text-center'>Checkouts</h1>
 <h2 className='font-bold text-xl my-4'>1. Delivery Details</h2>
 <div className='mx-auto'>
  <form action="post">
  <div className="px-2 w-1/2 flex justify-between ">
  <div className="w-[42vh] mb-4">
        <label htmlFor="name" className="leading-7 text-sm text-gray-600">name</label>
        <input type="name" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
  <div className="w-[42vh] mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
        <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div> </div>
  <div className=" w-[88vh] mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Address</label>
        <textarea  id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="px-2 w-1/2 flex justify-between ">
      <div className="w-[42vh] mb-4">
        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
        <input type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
  <div className=" w-[42vh] mb-4">
        <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
        <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
       </div> 
     
       <div className="px-2 w-1/2 flex justify-between ">
       <div className=" w-[42vh] mb-4">
        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
        <input type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
         <div className="w-[42vh] mb-4">
        <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
        <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div> 
      </div>
 </form>
 </div>
 <h2 className='font-bold text-xl my-4'>2. Review Cart Item</h2>
 <div  className="sidecart  bg-pink-100 p-10 ">
        <h2 className='font-bold text-3xl text-center'>Shoping Cart</h2>
        <ol className='list-decimal font-semibold'>
         { Object.keys(cart).length===0 && <h2 className='text-xl text-red-800 text-center mt-5'>no items in the cart!</h2>}
         {Object.keys(cart).length!==0 &&Object.keys(cart).map((item:any)=>{
          return  <li key={item}>
            <div className="item flex my-5">
              <div className="w-2/3 font-semibold ">Tshirts -  {cart[item].name + " - " + cart[item].variant + " - " + cart[item].size } </div>
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
        
        <h3>subtotal :{subtotal}</h3>
        <div className='flex justify-around'>
        <button className='flex mt-16 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-500 rounded text-sm' onClick={clearCart} disabled={Object.keys(cart).length===0}>Clear Cart</button> 
        <button className='flex mt-16 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-500 rounded text-sm' disabled={Object.keys(cart).length===0} >Pay ₹ {subtotal} </button> 
      
      </div>
      </div>
    </div>
  )
}
