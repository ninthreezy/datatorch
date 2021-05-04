import { applyMiddleware } from 'graphql-middleware'
import NexusPrismaScalars from '../../../shared/prisma/node_modules/nexus-prisma/scalars'
import { makeSchema } from 'nexus'
import { PrismaClient } from '../../../shared/prisma/node_modules/@prisma/client'

import * as types from './modules/types'
import { join } from 'path'

export const schema = applyMiddleware(
  makeSchema({
    types: { ...types, ...NexusPrismaScalars },
    contextType: {
      module: join(__dirname, 'context.ts'),
      export: 'Context'
    },
    outputs: {
      schema: join(__dirname, 'generated', 'schema.graphql'),
      typegen: join(__dirname, 'generated', 'typing.ts')
    },
    sourceTypes: {
      modules: [
        {
          module: join(
            __dirname,
            '..',
            '..',
            '..',
            'shared',
            'prisma',
            'node_modules',
            '@prisma',
            'client',
            'index.d.ts'
          ),
          alias: 'prismaclient'
        }
      ]
    }
  })
)
