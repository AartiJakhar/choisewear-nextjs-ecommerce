import { useRouter } from 'next/router'
import React,{useEffect,useState} from 'react'

export default function Orders({nextauthUrl}:any) {
    const router = useRouter()
    // store orders 
    const [orders, setOrders] = useState<any>(undefined)

    const myorders=async()=>{
     const user =  localStorage.getItem('token')
     console.log(user)
      const res = await fetch(`${nextauthUrl}api/orders/orders`,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token') as any,
        },
                body: JSON.stringify({user})
      })
      const data = await res.json()
      setOrders(data)
      console.log(data)
    }
    useEffect(() => {

        if(!localStorage.getItem('token')){
       router.push('/')
        }else{
          myorders()
        }
    }, [router])
  return (
    <div className="container mx-auto my-5 flex  flex-col ">
        <div>
            <h2 className='text-3xl text-center py-4'>My Orders</h2>
        </div>
    <div className="flex flex-col mx-10">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden text-center">
{ orders !==undefined && orders.orders.length !==0?   <table className="min-w-full">
            <thead className="bg-white border-b">
              <tr>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  quantity
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                 name
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                 variant
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  size
                </th>
              </tr>
            </thead>
            <tbody>
{  orders.orders.filter((value:any)=>{return value}).map((elements:any)=>{
      return Object.values(elements.products).map((e:any)=>{
          return  <tr key={Math.random()} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{e.qty}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {e.name}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {e.variant}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                 {e.size}
                </td>
              </tr>
        })
        // return console.log(a) 

             
           
      })}
            </tbody>
          </table>:<div className='bg-slate-200 rounded  p-3 inline-block mx-auto '><h2 className='text-blue-900 text-bold'>No Results To Display</h2></div>}
          
        </div>
      </div>
    </div>
  </div>

    </div>
  )
}
export async function getServerSideProps(context: any) {

    let nextauthUrl =process.env.NEXTAUTH_URL

    return { props: { nextauthUrl } }
  }