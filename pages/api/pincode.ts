// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
 arr:number[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const arr=[234400,721302, 110003,560017,341516]
res.status(200).json({arr})
}
