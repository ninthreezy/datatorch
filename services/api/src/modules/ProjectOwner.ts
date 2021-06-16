import { ProjectOwner as ProjectOwnerEntity } from 'nexus-prisma'
import {
  entityCreate,
  entityCreateType,
  entityDelete,
  entityReadUnique
} from './utils/graphqlPrisma'

export const ProjectOwnerReadUniqueQuery = entityReadUnique(ProjectOwnerEntity)
export const ProjectOwnerCreateMutation = entityCreate(ProjectOwnerEntity)
export const ProjectOwnerDeleteMutation = entityDelete(ProjectOwnerEntity)
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
