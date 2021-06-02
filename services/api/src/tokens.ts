import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import { TOKEN_SECRET } from './context'
import { sign } from 'jsonwebtoken'
import { addDays, addHours, addMinutes } from 'date-fns'
import { Role } from '@prisma/client'

export function tokenHook(
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) {
  const refreshToken = request.cookies['refresh-token']
  const accessToken = request.cookies['access-token']

  if (!refreshToken && !accessToken) return done()
  // try {
  //   const data = verify
  // }
  done()
}

export enum LoginOrRegister {
  LOGIN,
  REGISTER
}

type issueTokensOptions = {
  reply: FastifyReply
  userData: UserData
  loginOrRegister: LoginOrRegister
  count: number
  remember: boolean
}

export type UserData = {
  userId: string
  siteRole: Role
  email: string
  login: string
}

function createToken(userOptions: UserData, count: number, expiresIn: string) {
  return sign(
    {
      ...userOptions,
      count
    },
    TOKEN_SECRET,
    {
      expiresIn
    }
  )
}

function setToken(
  reply: FastifyReply,
  name: string,
  token: string,
  expires: Date
) {
  reply.setCookie(name, token, {
    expires,
    httpOnly: true,
    secure: true,
    signed: true
  })
}

export function issueTokens(opts: issueTokensOptions) {
  const { reply, count, loginOrRegister, remember, userData } = opts
  let expiresIn: string, expires: Date
  if (loginOrRegister === LoginOrRegister.LOGIN) {
    if (remember) {
      expiresIn = '30d'
      expires = addDays(new Date(), 30)
    } else {
      expiresIn = '4h'
      expires = addHours(new Date(), 4)
    }
  } else {
    expiresIn = '7d'
    expires = addDays(new Date(), 7)
  }

  const refreshToken = createToken(userData, count, expiresIn)
  const accessToken = createToken(userData, count, '15min')

  setToken(reply, 'refresh-token', refreshToken, expires)
  setToken(reply, 'access-token', accessToken, addMinutes(new Date(), 15))
  return { refreshToken, accessToken }
}
