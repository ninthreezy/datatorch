import { ApolloServer } from 'apollo-server-fastify'
import fastify from 'fastify'

import { createContext } from './context'
import { schema } from './schema'

const GRAPHQL_API = '/api/graphql'
const PORT = 3000

// const c = new PrismaClient()

const createApp = async () => {
  const graphql = new ApolloServer({
    schema,
    context: createContext
  })

  const app = fastify({ logger: true })
  app.register(graphql.createHandler({ path: GRAPHQL_API }))
  return app
}

/**
 * Start API server on specified endpoint
 */
const startApp = async () => {
  const app = await createApp()
  try {
    await app.listen(PORT)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

startApp()
