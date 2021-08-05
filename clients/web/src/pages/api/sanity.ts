import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  setCookie({ res }, 'testCookie', 'value', {
    maxAge: 30 * 24 * 60 * 60,
    path: '/'
  })
  res.send({ much: 'success' })
}
