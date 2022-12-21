// Next.js API route support: http://localhost:3000/api/getproduct
import type { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../modals/Product'
import connectDb from '../../midleware/mongoose'
type Data = {
  // tshirts:string[]
}
const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<Data>
)=> {
    let product =await Product.findOne({ slug:req.query.slug})
    let variants =await Product.find({ title:product.title,category:product.category})
    let colorSizeSlug:any={}

      for(let item of variants){
            if(Object.keys(colorSizeSlug).includes(item.color)){
                colorSizeSlug[item.color][item.size]={slug:item.slug}
            }
        else{
            colorSizeSlug[item.color]={}
            colorSizeSlug[item.color][item.size]={slug:item.slug}
       }
      }
  res.status(200).json({product:product,variants:colorSizeSlug})
}

export default connectDb(handler)
