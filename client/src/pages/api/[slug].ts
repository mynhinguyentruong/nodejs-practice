import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query

  const data = await fetch(`http://localhost:9000/${slug as string}`)
  const result = await data.json()

  res.redirect(302, result)
}
