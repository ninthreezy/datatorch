import { ApolloServer } from 'apollo-server-fastify'
import fastify from 'fastify'

import { createContext as context, TOKEN_SECRET } from './context'
import { schema } from './schema'
import { logger } from './logger'
import cookie from 'fastify-cookie'
import cors from 'fastify-cors'
import { tokenHook } from './tokens'
import { GRAPHQL_ENDPOINT, FRONTEND_ENDPOINT } from './config'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

/**
 * Creates Fastify server and registers all plugins and hooks
 */
export const createApp = async () => {
  // We are overwriting the new Apollo GUI for now. The old
  // playground works fine.
  const graphql = new ApolloServer({
    schema,
    context,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
  })
  await graphql.start()
  const app = fastify({ logger })

  // Logic for our cookie and CORS system.
  app.register(cookie, { secret: TOKEN_SECRET })
  app.register(cors, {
    origin: FRONTEND_ENDPOINT,
    credentials: true,
    methods: ['GET', 'POST']
  })
  // Decorator for TS to recognize our user property set by the tokenHook.
  app.decorateRequest('user', null)
  app.addHook('onRequest', tokenHook)
  // CORS must be overriden here in order for our cors options to not be ovewritten.

  app.register(graphql.createHandler({ path: GRAPHQL_ENDPOINT, cors: false }))
  return app
}
