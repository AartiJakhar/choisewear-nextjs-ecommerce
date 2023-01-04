import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Post({ addToCart, data, buyNow }: any) {

  const [pincode, setPincode] = useState("")
  const [checkpin, setcheckpin]: any = useState()
  const { product, variants } = data
  // color or size states
  const [size, setSize] = useState(product.size)
  const [color, setColor] = useState(product.color)


  const toogleClick = async () => {
    const pins = await fetch('http://localhost:3000/api/pincode')
    const pinJson = await pins.json()
    if (pinJson.arr.includes(parseInt(pincode))) {
      setcheckpin(true)
      toast.success('🦄 Wow  Pincode is serviceable', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }
    else {
      toast.error('😐 Sorry Pincode is not serviceable ', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setcheckpin(false)
    }
  }
  const toogleChange = (e: any) => {
    setPincode(e.target.value)
  }
  //to set size or color variant 
  const refreshVariant = (newSize: any, newColor: string) => {

    let url: any = `http://localhost:3000/product/${variants[newColor][newSize]['slug']}`
    window.location = url;
  }
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <ToastContainer />
      <div className="container  py-14 mx-auto">
        <div className="lg:w-5/5  mx-auto flex flex-wrap">
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto  object-cover object-center rounded" src={product.img} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest px-2">BRAND NAME</h2>
            <h1 className="text-gray-900 md:text-5xl text-3xl title-font font-medium mb-1">{product.title} ({product.size}/{product.color})</h1>

            <p className="md:text-3xl my-3 md:my-8 leading-relaxed">{product.desc}</p>
            <div className="flex  mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex align-middle items-center my-3">
                <span className="mr-3 text-4xl">Color</span>
                {Object.keys(variants).map((e) => {
                  return (<button onClick={() => { refreshVariant(Object.keys(variants[e])[0], e) }} key={e} className={`border-2  ${color === e ? `border-gray-500 shadow-lg w-11 h-11` : 'border-gray-300'} ml-1 bg-${e === "black" ? "neutral" : e}-500 rounded-full bg w-8 h-8 focus:outline-none`}
                    style={{ background: `${e === 'black' && "black" || e === 'green' && "green" || e === 'yellow' && "yellow" || e === 'red' && "red"}` }}
                  ></button>)
                })}
                {/* <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button> */}

              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3 md:text-3xl">Size</span>
                <div className="relative">
                  <select value={size} onChange={(e) => { refreshVariant(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-3xl pl-3 pr-10">

                    {Object.keys(variants[color]).map((e) => { return <option key={e}>{e}</option> })}

                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex ">
              <div className='flex w-[11rem]'>
                <span className="title-font font-medium text-2xl text-gray-900">₹ {product.price}</span>
                <button onClick={() => { buyNow(product.slug, 1, product.price, product.title, product.size, product.color) }} className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded">Buy Now</button>
              </div>

              <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded" onClick={() => { addToCart(product.slug, 1, product.price, product.title, product.size, product.color) }}>Add to Cart</button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
            <div className=' pin mt-20 mr-14 flex space-x-2 justify-between text-sm'>
              <input type="text" name="pincode" placeholder='341516' id="pincode" className='px-2 py-2 border-2
        border-pink-500 outline-0 rounded-md' onChange={toogleChange} />
              <button onClick={toogleClick} className="flex  text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Check</button>
            </div>
            {!checkpin && checkpin != null && <div className="text-red-700 text-sm mt-3">
              Sorry! we do not deliver to this pincode yet
            </div>}
            {checkpin && checkpin != null && <div className="text-green-700 text-sm mt-3">
              Yay! This pincode is serviceable
            </div>}
          </div>
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context: any) {
  // Fetch data from external data source
  const { slug } = context.params
  const res = await fetch(`http://localhost:3000/api/product?slug=${slug}`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

