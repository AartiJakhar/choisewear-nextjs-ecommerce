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
    let products =await Product.find({ category:req.query.category})
    let tshirts:any={};
      for(let item of products){
        if(item.title in tshirts){
            if(!tshirts[item.title].color.includes(item.color)&& item.availableQty>0){
              tshirts[item.title].color.push(item.color)
            }
            if(!tshirts[item.title].size.includes(item.size) && item.availableQty>0){
              tshirts[item.title].size.push(item.size)
            }
        }
        else{
         tshirts[item.title]=JSON.parse(JSON.stringify(item))
          if(item.availableQty>0){
            tshirts[item.title].color=[item.color]
            tshirts[item.title].size=[item.size]
          }
        }
      }
  res.status(200).json({tshirts})
}

export default connectDb(handler)
