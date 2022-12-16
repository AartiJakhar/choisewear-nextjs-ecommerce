// Next.js API route support: http://localhost:3000/api/getproduct
import type { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../modals/Product'
import connectDb from '../../midleware/mongoose'
type Data = {
    products:string[],
}
const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<Data>
)=> {
    let products =await Product.find()

  res.status(200).json({products:products})
}

export default connectDb(handler)
