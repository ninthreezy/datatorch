import { Project as ProjectEntity } from 'nexus-prisma'
import {
  entityCreateSingle,
  entityCreateType,
  entityReadUnique
} from './utils/graphqlPrisma'

export const ProjectE = entityCreateType({
  entity: ProjectEntity,
  properties: ['id', 'owner']
})
export const ProjectReadUniqueQuery = entityReadUnique(ProjectEntity)
export const ProjectCreate = entityCreateSingle(ProjectEntity)
