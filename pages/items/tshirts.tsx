import Link from 'next/link'
import React,{useEffect} from 'react'

export default function tshirts({data}:any) {
  const {tshirts}=data;
 
  
  return (
    <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-wrap justify-around -m-4">
       {tshirts && Object.keys(tshirts).map((e:any)=>{
        return <div key={tshirts[e]._id} className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg mx-4  ">
          <Link href={`/product/${tshirts[e].slug}`}  className=" block h-[60%] relative  rounded overflow-hidden">
            <img  alt="ecommerce" className="m-auto object-cover object-top  block" src={tshirts[e].img} />
          </Link>
          <div className="mt-4">
            <h3 className="text-gray-500 text-3xl md:text-xs tracking-widest title-font mb-1">{tshirts[e].category}</h3>
            <h2 className=" my-2 text-gray-900 title-font text-lg font-medium">{tshirts[e].title}</h2>
            <h3>{tshirts[e].desc}</h3>
            <div className='my-3'>
 {tshirts[e].size.map((e:string)=>{
               return <span key={e} className=' border-solid border-2 border-slate-300 mx-1 px-2'>{e }</span>
            })}
 {tshirts[e].color.map((e:string)=>{
               return <button key={e} className={`border-2 border-gray-300 ml-1 bg-${e==="black"?'neutral':e}-500 rounded-full w-6 h-6 focus:outline-none`}></button>
            })}
            </div>
           
            <p className="mt-1"> ₹ {tshirts[e].price}</p>
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
  const res = await fetch(`http://localhost:3000/api/getproduct?category=T-Shirt`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
