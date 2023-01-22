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

    let categoryProducts:any={};
      for(let item of products){
        console.log(item.availableQty)
        if(item.availableQty!=0){
        if(item.title in categoryProducts ){

            if(!categoryProducts[item.title].color.includes(item.color)&& item.availableQty>0){
              categoryProducts[item.title].color.push(item.color)
            }
            if(!categoryProducts[item.title].size.includes(item.size) && item.availableQty>0){
              categoryProducts[item.title].size.push(item.size)
            }
        }
        else{
          categoryProducts[item.title]=JSON.parse(JSON.stringify(item))
          if(item.availableQty>0){
            categoryProducts[item.title].color=[item.color]
            categoryProducts[item.title].size=[item.size]
          }
        }}
      }
  res.status(200).json({categoryProducts})
}

export default connectDb(handler)
