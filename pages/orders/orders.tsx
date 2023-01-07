import { useRouter } from 'next/router'
import React,{useEffect} from 'react'

export default function Orders() {
    const router = useRouter()
    useEffect(() => {
        if(!localStorage.getItem('token')){
       router.push('/')
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
        <div className="overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-white border-b">
              <tr>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  #
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  First
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Last
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Handle
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Mark
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Otto
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  @mdo
                </td>
              </tr>
              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Jacob
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Thornton
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  @fat
                </td>
              </tr>
              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Larry
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Wild
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  @twitter
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

    </div>
  )
}

export async function getServerSideProps(context: any) {
    // Fetch data from external data source
    let nextauthUrl =process.env.NEXTAUTH_URL
    // const { slug } = context.params
    const res = await fetch(`${nextauthUrl}api/orders/orders`)
    const data = await res.json()
   console.log(data)
    // Pass data to the page via props
    return { props: { data ,nextauthUrl} }
  }