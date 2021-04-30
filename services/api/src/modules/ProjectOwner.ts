import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { ProjectOwner } from 'nexus-prisma'

export const ProjectOwnerQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('projectOwner', {
      type: 'ProjectOwner',
      args: {
        id: nonNull(stringArg())
      },
      resolve(_root, args, ctx) {
        return ctx.db.projectOwner.findUnique({ where: args })
      }
    })
  }
})

export const ProjectOwnerMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createProjectOwner', {
      type: 'ProjectOwner',
      args: {
        email: nonNull(stringArg()),
        login: nonNull(stringArg()),
        name: nonNull(stringArg())
      },
      resolve(_root, args, ctx) {
        return ctx.db.projectOwner.create({
          data: args
        })
      }
    })
  }
})

interface NexusPrismaEntity {
  $name: string
  $description: string
  [prop: string]:
    | {
        type: unknown
        name: string
        description?: string
      }
    | any
}

const createObjectTypeFromPrisma = <Entity extends NexusPrismaEntity>(
  entity: Entity,
  properties: Array<Exclude<keyof Entity, '$name' | '$description'>>
) => {
  return objectType({
    name: entity.$name,
    description: entity.$description,
    definition(t) {
      for (const prop of properties) {
        const { name, type } = entity[prop]
        t.field(name, { type })
      }
    }
  })
}

export const NProjectOwner = createObjectTypeFromPrisma(ProjectOwner, [
  'id',
  'email',
  'login',
  'name',
  'avatarUrl',
  'description',
  'createdAt',
  'updatedAt',
  'disabled',
  'location'
])

// export const NProjectOwner = objectType({
//   name: ProjectOwner.$name,
//   description: ProjectOwner.$description,
//   definition(t) {
//     t.field(ProjectOwner.id.name, {
//       type: ProjectOwner.id.type
//     })
//     t.field(ProjectOwner.email.name, {
//       type: ProjectOwner.email.type
//     })
//     t.field(ProjectOwner.login.name, {
//       type: ProjectOwner.login.type
//     })
//     t.field(ProjectOwner.name.name, {
//       type: ProjectOwner.name.type
//     })
//     t.field(ProjectOwner.avatarUrl.name, {
//       type: ProjectOwner.avatarUrl.type
//     })
//     t.field(ProjectOwner.description.name, {
//       type: ProjectOwner.description.type
//     })
//     t.field(ProjectOwner.location.name, {
//       type: ProjectOwner.location.type
//     })
//     t.field(ProjectOwner.disabled.name, {
//       type: ProjectOwner.disabled.type
//     })
//     t.field(ProjectOwner.createdAt.name, {
//       type: ProjectOwner.createdAt.type
//     })
//     t.field(ProjectOwner.updatedAt.name, {
//       type: ProjectOwner.updatedAt.type
//     })
//     // TODO: add projects
//   }
// })
