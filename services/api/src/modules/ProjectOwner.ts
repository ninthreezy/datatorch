import { ProjectOwner as ProjectOwnerEntity } from 'nexus-prisma'
import {
  entityCreateSingle,
  entityCreateType,
  entityReadUnique
} from './utils/graphqlPrisma'

export const ProjectOwnerReadUniqueQuery = entityReadUnique(ProjectOwnerEntity)
export const ProjectOwnerCreateMutation = entityCreateSingle(ProjectOwnerEntity)
export const ProjectOwner = entityCreateType({
  entity: ProjectOwnerEntity,
  properties: [
    'id',
    'email',
    'login',
    'name',
    'avatarUrl',
    'description',
    'createdAt',
    'updatedAt',
    'disabled',
    'location',
    'siteRole'
  ]
})
