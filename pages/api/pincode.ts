// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
pincodes:object,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    let pincodes={
      "341516":["Kuchaman","Nagaur"],
      "110003":["Delhi","Delhi"],
      "560017":["Bangalore","West Bengal"],
    }
res.status(200).json({pincodes})
}
