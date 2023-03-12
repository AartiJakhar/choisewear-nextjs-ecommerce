import Link from 'next/link'
import React, { useEffect } from 'react'

export default function tshirts({ data }: any) {
  const { categoryProducts } = data;


  return (
    <section className="text-gray-600 body-font  py-14 h-screen">
      <div className="container px-5 py-20 mx-auto">
        <div className="flex flex-wrap justify-around -m-4">
          {categoryProducts && Object.keys(categoryProducts).map((e: any) => {
            return <div key={categoryProducts[e]._id} className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg mx-4  ">
              <Link href={`/product/${categoryProducts[e].slug}`} className="block overflow-hidden">
                <img alt="ecommerce" className="hover:scale-125 duration-300 overflow-hidden w-36 m-auto object-cover object-top  block" src={categoryProducts[e].img} />
              </Link>
              <div className="mt-4">
                <h3 className="text-gray-500 text-3xl md:text-xs tracking-widest title-font mb-1">{categoryProducts[e].category}</h3>
                <h2 className=" my-2 text-gray-900 title-font text-lg font-medium">{categoryProducts[e].title}</h2>
                <div className='flex flex-wrap'>
                  <div className='py-3'>

                    {categoryProducts[e].size.map((e: string) => {
                      return <span key={e} className=' border-solid border-2 border-slate-300 mx-1 px-2'>{e}</span>
                    })}
                  </div>
                  <div className='bg-gray-500 bg-black bg-red-500 bg-pink-500 bg-white'></div>
                  <div className=' py-3 relative'>
                    {categoryProducts[e].color.map((element: string, i: number) => {
                      return <button key={element} className={`relative right-${i} border-2 border-gray-300 ml-1 bg-${element === "black" ? 'neutral' : element}-500 rounded-full w-6 h-6 focus:outline-none`} style={{ background: `${element === 'black' && "black" || element === 'green' && "green" || element === 'yellow' && "yellow" || element === 'red' && "red"}` }} ></button>
                    })}
                  </div>
                </div>

                <p className="mt-1"> ₹ {categoryProducts[e].price}</p>
              </div>
            </div>
          })}
        </div>
      </div>
    </section>
  )
}
export async function getServerSideProps() {
  // Fetch data from external data source
  const res = await fetch(`${process.env.NEXTAUTH_URL}api/getproduct?category=T-Shirt`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
