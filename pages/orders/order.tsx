import React,{useEffect} from 'react'
import { useRouter } from 'next/router'
import mongoose from 'mongoose'
import Order from '../../modals/Order'
export default function Myorder({order}:any) {

  const router = useRouter()
  useEffect(() => {
      if(!localStorage.getItem('token')){
     router.push('/')
      }
  }, [router])
  return (
    <section className="text-gray-600 body-font overflow-hidden">
    <div className="container px-5 py-24 mx-auto">
      <div className="lg:w-4/5 mx-auto flex flex-wrap">
        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest">Choicewear.com</h2>
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id : ${order[0].orderid}</h1>
          <p className="leading-relaxed mb-4">Your order has been successfully placed </p>
          <div className="flex mb-4">
          <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">item Description</a>
        <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Quantity</a>
          <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Item Price</a>
        </div>
 {order&& order[0].products && Object.values(order[0].products).map((e:any)=>{
  return  <div key={Math.random()} className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500">{e.name} ({e.size}/{e.variant})</span>
            <span className="ml-auto text-gray-900">{e.qty}</span>
            <span className="ml-auto text-gray-900">{e.price}</span>
          </div>
 })}
         
    
          <div className="flex mt-10">
            <span className="title-font font-medium text-2xl text-gray-900">SubTotal  : ₹ {order[0].amount}</span>
            <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Status : {order[0].status}</button>
            <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>
        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={"/checkout.gif"}/>
      </div>
    </div>
  </section>
  )
}
export async function getServerSideProps(context: any) {
 if(!mongoose.connections[0].readyState){
  await mongoose.connect(process.env.MONGODB_URI!)
 }
 let id = context.query.id 
 let order = await Order.find({orderid:id})
 

  return { props: {order:JSON.parse(JSON.stringify(order)) } }
}