import { Project as ProjectEntity } from 'nexus-prisma'
import {
  entityCreate,
  entityCreateType,
  entityDelete,
  entityReadUnique
} from './utils/graphqlPrisma'

export const ProjectE = entityCreateType({
  entity: ProjectEntity,
  properties: ['id', 'owner']
})
export const ProjectReadUniqueQuery = entityReadUnique(ProjectEntity)
export const ProjectCreate = entityCreate(ProjectEntity)
export const ProjectDelete = entityDelete(ProjectEntity)
