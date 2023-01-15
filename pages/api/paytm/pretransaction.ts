// const https = require("https");
// const PaytmChecksum = require("PaytmChecksum");
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

 if(req.method=='POST'){

 


// var paytmParams:any = {};

// paytmParams.body  = {
//   requestType: "Payment",
//   mid: process.env.NEXT_PUBLIC_PAYTM_MID,
//   websiteName: "YOUR_WEBSITE_NAME",
//   orderId: req.body.oid,
//   callbackUrl: `${process.env.NEXT_PUBLIC_HOST}api/paytm/posttransaction`,
//   txnAmount: {
//     value: req.body.subtotal,
//     currency: "INR",
//   },
//   userInfo: {
//     custId: req.body.email
//     , //custmer id 
//   },
// };

// /*
//  * Generate checksum by parameters we have in body
//  * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
//  */
// const checksum=PaytmChecksum.generateSignature(
//   JSON.stringify(paytmParams.body),
//  process.env.NEXT_PUBLIC_PAYTM_KEY //*marchent key
// )
//   paytmParams.head = {
//     signature: checksum,
//   };

//   var post_data = JSON.stringify(paytmParams);
// const requestAsync = ()=>{
//   return new Promise ((resolve,reject)=>{

//     var options = {
//       /* for Staging */
//       // hostname: "securegw-stage.paytm.in" /* for Production */,
//        hostname: 'securegw.paytm.in',
  
//       port: 443,
//       path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Content-Length": post_data.length,
//       },
//     };
  
//     var response:any = "";
//     var post_req = https.request(options, function (post_res:any) {
//       post_res.on("data", function (chunk:any) {
//         response += chunk;
//       });
  
//       post_res.on("end", function () {
//         console.log("Response: ", response);
//         resolve(JSON.parse(response).body)
//       });
//     });
  
//     post_req.write(post_data);
//     post_req.end();
//   })
// }
// let myr=await requestAsync()
res.status(200).json({hello:"hello"})

}
}