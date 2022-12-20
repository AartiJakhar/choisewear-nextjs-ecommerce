// Next.js API route support: http://localhost:3000/api/Addproduct
import type { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../modals/Product'
import connectDb from '../../midleware/mongoose'
type Data = {
    errorr: string,
    success:boolean,
}
const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<Data>
)=> {
    try {
         if(req.method=="POST"){
         for (let i = 0; i < req.body.length; i++) {
             
        let p =new Product({
  title: req.body[i].title,
  slug:req.body[i].slug,
  desc: req.body[i].desc,
  img: req.body[i].img,
  category: req.body[i].category,
  size: req.body[i].size,
  color: req.body[i].color,
  price:req.body[i].price,
  availableQty: req.body[i].availableQty

        })
           await p.save() 
         }
          res.status(200).json({success:true,errorr:"no error occured"})
        }
    else{
        res.status(400).json({errorr:"This method is not allowed",success:false})
    }
    } catch (error:any) {
        res.status(400).json(error)
    }
   

 
}

export default connectDb(handler)
