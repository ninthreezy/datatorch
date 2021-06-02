import { ContextFunction, Context as ApolloContext } from 'apollo-server-core'
import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaClient } from '@shared/db'

type FastifyResponse = { request: FastifyRequest; reply: FastifyReply }
const db = new PrismaClient()
export interface Context extends ApolloContext {
  db: PrismaClient
  reply: FastifyReply
  request: FastifyRequest
}

export const TOKEN_SECRET = 'REPLACETHISWITHSOMETHINGELSE'

export const createContext: ContextFunction<FastifyResponse, Context> = ctx => {
  return { ...ctx, db }
}
