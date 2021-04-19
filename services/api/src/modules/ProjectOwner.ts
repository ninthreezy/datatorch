import { extendType, objectType } from 'nexus'

export const ProjectOwner = objectType({
  name: 'ProjectOwner',
  definition(t) {
    t.int('id')
    t.string('login')
    t.string('email')
    t.string('name')
    t.string('avatarUrl')
    t.string('description')
    t.string('location')
    t.boolean('disabled')
    t.string('createdAt')
    t.string('updatedAt')
  }
})

export const ProjectOwnerQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('user', {
      type: 'ProjectOwner'
    })
  }
})
