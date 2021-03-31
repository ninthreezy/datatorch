import { applyMiddleware } from 'graphql-middleware'
// import { GraphQLDateTime as DateTime } from 'graphql-iso-date'
import { makeSchema } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'

import * as types from './modules/types'
import { PrismaClient } from '@datatorch/prisma'

export const schema = applyMiddleware(
  makeSchema({
    types,
    plugins: [nexusPrisma({ prismaClient: () => new PrismaClient() })],
    contextType: {
      module: require.resolve('./context'),
      export: 'Context'
    },
    outputs: {
      schema: `${__dirname}/../generated/schema.graphql`,
      typegen: `${__dirname}/../generated/typing.ts`
    },
    sourceTypes: { modules: [{ module: '@prisma/client', alias: 'prisma' }] }
  })
)
