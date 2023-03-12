import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function Orders({ nextauthUrl }: any) {
  const router = useRouter()
  // store orders 
  const [myorders, setmyOrders] = useState<any>(undefined)
  const getorders = async () => {
    const user = localStorage.getItem('token')

    const res = await fetch(`${nextauthUrl}api/orders/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token') as any,
      },
      body: JSON.stringify({ user })
    })
    const data = await res.json()
    setmyOrders(data)

  }
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/')
    } else {
      getorders()
    }
  }, [router])
  return (
    <div className="container mx-auto my-5 flex  flex-col py-20">
      <div>
        <h2 className='text-3xl text-center py-4'>My Orders</h2>
      </div>
      <div className="flex flex-col mx-10">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden text-center">
              {myorders === undefined && <h3>loading..</h3>}
              {myorders !== undefined && myorders.orders.length !== 0 && <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                      #Oreder Id
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                      Email
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                      Amount
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {myorders.orders.map((e: any) => {
                    return    <tr key={e._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{e.orderid}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {e.email}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {e.amount}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                         <Link href={`/orders/order?id=${e.orderid}`}>Details</Link>
                        </td>
                      </tr>
                  })}
                </tbody>
              </table>}
              {myorders !== undefined && myorders.orders.length === 0 && <div className='bg-slate-200 rounded  p-3 inline-block mx-auto '><h2 className='text-blue-900 text-bold'>No Results To Display</h2></div>}

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export async function getServerSideProps(context: any) {

  let nextauthUrl = process.env.NEXTAUTH_URL

  return { props: { nextauthUrl } }
}