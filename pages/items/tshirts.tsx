import Link from 'next/link'
import React from 'react'

export default function tshirts({data}:any) {
  const {products}=data;

  return (
    <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-wrap justify-around -m-4">
       {products && products.map((e:any)=>{
        return <div key={e._id} className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg mx-4  ">
          <Link href={"/product/the-catalyzer"}  className="block h-[70%] relative  rounded overflow-hidden">
            <img  alt="ecommerce" className=" object-cover object-top w-full h-full block" src={e.img} />
          </Link>
          <div className="mt-4">
            <h3 className="text-gray-500 text-3xl md:text-xs tracking-widest title-font mb-1">{e.category}</h3>
            <h2 className=" text-gray-900 title-font text-lg font-medium">{e.title}</h2>
            <h3>{e.desc}</h3>
            <p className="mt-1">{e.price}</p>
          </div>
        </div>
       }) }
      </div>
    </div>
  </section>
  )
}
export async function getServerSideProps() {
  // Fetch data from external data source
  const res = await fetch(`http://localhost:3000/api/getproduct`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
