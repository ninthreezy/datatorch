import { applyMiddleware } from 'graphql-middleware'
import NexusPrismaScalars from 'nexus-prisma/scalars'
import { makeSchema } from 'nexus'

import * as types from './modules/types'
import { join } from 'path'

export const schema = applyMiddleware(
  makeSchema({
    types: { ...types, ...NexusPrismaScalars },
    contextType: {
      // TODO: change to join
      module: join(__dirname, 'context.ts'),
      export: 'Context'
    },
    outputs: {
      // TODO: change to join
      schema: `${__dirname}/generated/schema.graphql`,
      typegen: `${__dirname}/generated/typing.ts`
    },
    sourceTypes: { modules: [{ module: '@prisma/client', alias: 'prisma' }] }
  })
)
