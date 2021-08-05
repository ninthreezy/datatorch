import { ApolloServer } from 'apollo-server-fastify'
import fastify from 'fastify'

import { createContext as context, TOKEN_SECRET } from './context'
import { schema } from './schema'
import { logger } from './logger'
import cookie from 'fastify-cookie'
import cors from 'fastify-cors'
import { tokenHook } from './tokens'
import { GRAPHQL_ENDPOINT } from './config'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

/**
 * Creates Fastify server and registers all plugins, and hooks
 */
export const createApp = async () => {
  const graphql = new ApolloServer({
    schema,
    context,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
  })
  await graphql.start()
  const app = fastify({ logger })
  app.register(cookie, { secret: TOKEN_SECRET })
  app
  app.decorateRequest('user', null)
  app.addHook('onRequest', tokenHook)
  app.register(graphql.createHandler({ path: GRAPHQL_ENDPOINT }))
  return app
}
