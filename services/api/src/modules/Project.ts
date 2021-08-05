// import { Project as ProjectEntity } from 'nexus-prisma'
// import {
//   entityCreate,
//   entityCreateType,
//   entityDelete,
//   entityReadUnique
// } from './utils/graphqlPrisma'

// export const Project = entityCreateType({
//   entity: ProjectEntity,
//   properties: ['id', 'visibility']
// })
// export const ProjectReadUniqueQuery = entityReadUnique(ProjectEntity)
// export const ProjectCreate = entityCreate(ProjectEntity)
// export const ProjectDelete = entityDelete(ProjectEntity)

import { extendType, objectType } from 'nexus'

export const Project = objectType({
  name: 'Project',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('description')
    t.boolean('disabled')
    t.string('createdAt')
    t.string('updatedAt')
  }
})

export const ProjectQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('project', {
      type: 'Project'
    })
  }
})
