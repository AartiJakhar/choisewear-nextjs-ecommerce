import React, { useState, useEffect } from 'react'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
// to define glodle variables to window with typescript 
import '../types/index.ts'
export default function Checkout({ addToCart, cart, setCart, saveCart, removeFromCart, clearCart, subtotal }: any) {
  const router = useRouter()
  const [Caseondelivery, setCaseondelivery] = useState(false)
  const [credentials, setCredentials] = useState({ name: "", email: "", address: "", phone: "", pincode: "" })
  const [disable, setDisable] = useState(false)
  const changeCredentials = (e: any) => {

    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  // to get real states or credential to update button disabled or not 
  useEffect(() => {
    if (credentials.name.length > 3 && credentials.phone.length > 9 && credentials.email.length > 3 && credentials.address.length > 3 && credentials.pincode.length > 3) {
      setDisable(true)

    }
    else {
      setDisable(false)

    }



  }, [credentials])

  // to get payment through paytm 
  // const initiatePayment = async () => {

  //   let oid = Math.floor(Math.random() * Date.now());
  //   let dataa = { cart, subtotal, oid, email: credentials.email,name:credentials.name,address:credentials.address,pincode:credentials.pincode,phone:credentials.phone };
  //   //get a transition token 
  //   const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/paytm/pretransaction`, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json"
  //     },
  //     body: JSON.stringify(dataa),
  //   })
  //   let txnRes = await data.json()
  //   console.log(txnRes)
  //   let txnToken = txnRes.txnToken
  //   console.log(txnToken)
  //   if (txnToken == undefined) {
  //     setCaseondelivery(true)
  //   }
  //   //paytm process after getting txnToken 
  //   let config: any = {
  //     "root": "",
  //     "flow": "DEFAULT",
  //     "data": {
  //       "orderId": oid, /* update order id */
  //       "token": txnToken, /* update token value */
  //       "tokenType": "TXN_TOKEN",
  //       "amount": subtotal/* update amount */
  //     },
  //     "handler": {
  //       "notifyMerchant": function (eventName: any, data: any) {
  //         console.log("notifyMerchant handler function called");
  //         console.log("eventName => ", eventName);
  //         console.log("data => ", data);
  //       }
  //     }
  //   };
  //   // initialze configuration using init method






  //   // window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
  //   //   // after successfully updating configuration, invoke JS Checkout
  //   //   console.log('init')
  //   //   window.Paytm.CheckoutJS.invoke();
  //   // }).catch(function onError(error: any) {
  //   //   console.log("error => ", error);
  //   // });

  // }

  // to get order with case payment method
  const caseOnSubmit = async () => {
    let oid = Math.floor(Math.random() * Date.now());
    let data = { cart, subtotal, oid, email: credentials.email, name: credentials.name, address: credentials.address, pincode: credentials.pincode, phone: credentials.phone };
    //get a transition token 
    const responce = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/orders/preorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token') as any,
      },
      body: JSON.stringify(data),
    })
    let success = await responce.json()
    console.log(success.success)
    if (success.success) {
      router.push("/orders/orders")
    }
    setCredentials({ name: "", email: "", address: "", phone: "", pincode: "" })
    saveCart({})
    setCart({})
  }

  return (
    <div className='container m-auto'>
      {/* adding checkoutjs for paytm  */}
      <Script src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} crossOrigin="anonymous"></Script>
      <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      {/**  adding checkoutjs for paytm **/}
      <h1 className='font-bold text-3xl my-8 text-center'>Checkouts</h1>
      <h2 className='font-bold text-xl my-4'>1. Delivery Details</h2>
      <div className='mx-auto'>
        <form action="post">
          <div className="px-4  md:w-3/4 sm:w-full lg:w-3/4   flex justify-between ">
            <div className="w-[32vh] md:w-[42vh] mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">name</label>
              <input required type="name" value={credentials.name} onChange={changeCredentials} id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="w-[32vh] md:w-[42vh] mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input required type="email" value={credentials.email} onChange={changeCredentials} id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div> </div>
          <div className=" px-4  md:w-3/4 sm:w-full lg:w-3/4  mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Address</label>
            <textarea required id="address" value={credentials.address} onChange={changeCredentials} name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="px-4  md:w-3/4 sm:w-full lg:w-3/4  flex justify-between ">
            <div className="w-[32vh] md:w-[42vh]mb-4">
              <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
              <input type="text" required value={credentials.phone} onChange={changeCredentials} id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className=" w-[32vh] md:w-[42vh] mb-4">

              <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
              <input type="number" required value={credentials.pincode} onChange={changeCredentials} id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>

          <div className="px-4 w md:w-3/4 sm:w-full lg:w-3/4  flex justify-between ">
            <div className=" w-[32vh] md:w-[42vh] mb-4">
              <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
              <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="w-[32vh] md:w-[42vh] mb-4">
              <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
              <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </form>
      </div>
      <h2 className='font-bold text-xl my-4'>2. Review Cart Item</h2>
      <div className="sidecart  bg-pink-100 p-10 ">
        <h2 className='font-bold text-3xl text-center'>Shoping Cart</h2>
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length === 0 && <h2 className='text-xl text-red-800 text-center mt-5'>no items in the cart!</h2>}
          {Object.keys(cart).length !== 0 && Object.keys(cart).map((item: any) => {
            return <li key={item}>
              <div className="item flex my-5">
                <div className="w-2/3 font-semibold ">Tshirts -  {cart[item].name + " - " + "( " + cart[item].variant + " / " + cart[item].size + " )"} </div>
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

        <h3>subtotal :{subtotal}</h3>
        <div className='flex justify-around'>
          <button className='flex mt-16 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-500 rounded text-sm' onClick={clearCart} disabled={Object.keys(cart).length === 0}>Clear Cart</button>
          {Caseondelivery ? <button onClick={() => console.log('first')} className='flex mt-16 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-500 rounded text-sm' disabled={Object.keys(cart).length === 0} >Pay ₹ {subtotal} </button>

            : Object.keys(cart).length !== 0 && <button className='disabled:bg-purple-800 flex mt-16 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-500 rounded text-sm' onClick={caseOnSubmit} disabled={!disable} >Case On Delivery ₹ {subtotal} </button>}
        </div>
      </div>
    </div>
  )
}
