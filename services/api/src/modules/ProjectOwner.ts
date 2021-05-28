import {
  booleanArg,
  enumType,
  extendType,
  nonNull,
  objectType,
  stringArg
} from 'nexus'
import { ProjectOwner as PO, Role, ProjectOwnerType } from 'nexus-prisma'
import argon2 from 'argon2'
import { sign } from 'jsonwebtoken'
import { addMinutes, addDays, addHours } from 'date-fns'

export const projectOwner = objectType({
  name: PO.$name,
  description: PO.$description,
  definition(t) {
    t.id(PO.id.name, PO.id)
    t.string(PO.name.name, PO.name)
    t.field(PO.createdAt.name, { type: 'DateTime', ...PO.createdAt })
    t.field(PO.updatedAt.name, { type: 'DateTime', ...PO.updatedAt })
    t.field(PO.lastSeenAt.name, { type: 'DateTime', ...PO.lastSeenAt })
    t.boolean(PO.disabled.name, PO.disabled)
    t.field(PO.type.name, PO.type)
    t.field(PO.role.name, PO.role)
  }
})

export const projectOwnerQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('projectOwner', {
      type: PO.$name,
      args: {
        id: nonNull(stringArg())
      },
      resolve(_root, args, ctx) {
        return ctx.db.projectOwner.findUnique({ where: args })
      }
    })
  }
})

export const register = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('register', {
      type: projectOwner,
      args: {
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
        login: nonNull(stringArg()),
        password: nonNull(stringArg())
      },
      async resolve(_root, args, ctx) {
        const hashedPassword = await argon2.hash(args.password)
        const projectOwner = await ctx.db.projectOwner.create({
          data: {
            type: 'USER',
            name: args.name,
            userCredentials: {
              create: {
                email: args.email,
                login: args.login,
                password: hashedPassword
              }
            }
          }
        })
        const refreshToken = sign(
          {
            userId: projectOwner.id,
            count: 0
          },
          ctx.TOKEN_SECRET,
          {
            expiresIn: '7d'
          }
        )
        const accessToken = sign(
          { userId: projectOwner.id },
          ctx.TOKEN_SECRET,
          {
            expiresIn: '15min'
          }
        )
        ctx.reply.cookie('access-token', accessToken, {
          expires: addMinutes(new Date(), 15),
          httpOnly: true,
          signed: true
        })
        ctx.reply.cookie('refresh-token', refreshToken, {
          expires: addDays(new Date(), 7),
          httpOnly: true,
          signed: true
        })
        return projectOwner
      }
    })
  }
})

export const login = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('login', {
      type: 'String',
      args: {
        login: nonNull(stringArg()),
        password: nonNull(stringArg()),
        remember: nonNull(booleanArg())
      },
      async resolve(_root, args, ctx) {
        // check for existing credentials
        const userCredentials = await ctx.db.userCredentials.findUnique({
          where: { login: args.login },
          include: { projectOwner: true }
        })
        if (!userCredentials) return null

        // check for valid password
        const valid = argon2.verify(userCredentials.password, args.password)
        if (!valid) return null

        const refreshExpiresIn = args.remember ? '30d' : '4h'

        const refreshToken = sign(
          {
            userId: userCredentials.projectOwnerId,
            count: userCredentials.count
          },
          ctx.TOKEN_SECRET,
          {
            expiresIn: refreshExpiresIn
          }
        )

        const accessToken = sign(
          { userId: userCredentials.projectOwnerId },
          ctx.TOKEN_SECRET,
          {
            expiresIn: '15min'
          }
        )

        ctx.reply.cookie('access-token', accessToken, {
          expires: addMinutes(new Date(), 15),
          httpOnly: true,
          signed: true
        })
        ctx.reply.cookie('refresh-token', refreshToken, {
          expires: args.remember
            ? addDays(new Date(), 30)
            : addHours(new Date(), 4),
          httpOnly: true,
          signed: true
        })
        return userCredentials.projectOwnerId
      }
    })
  }
})

export const logout = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('logout', {
      type: 'Boolean',
      resolve(_root, _args, ctx) {
        ctx.reply.clearCookie('refresh-token')
        ctx.reply.clearCookie('access-token')
        return true
      }
    })
  }
})

export const role = enumType({
  name: Role.name,
  members: Role.members
})

export const projectOwnerType = enumType({
  name: ProjectOwnerType.name,
  members: ProjectOwnerType.members
})

// export const ProjectOwnerMutation = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.field('createProjectOwner', {
//       type: 'ProjectOwner',
//       args: {
//         email: nonNull(stringArg()),
//         login: nonNull(stringArg()),
//         name: nonNull(stringArg())
//       },
//       resolve(_root, args, ctx) {
//         return ctx.db.projectOwner.create({
//           data: args
//         })
//       }
//     })
//   }
// })

// interface NexusPrismaEntity {
//   $name: string
//   $description: string
//   [prop: string]:
//     | {
//         type: unknown
//         name: string
//         description?: string
//       }
//     | any
// }

// const createObjectTypeFromPrisma = <Entity extends NexusPrismaEntity>(
//   entity: Entity,
//   properties: Array<Exclude<keyof Entity, '$name' | '$description'>>
// ) => {
//   return objectType({
//     name: entity.$name,
//     description: entity.$description,
//     definition(t) {
//       for (const prop of properties) {
//         const { name, type } = entity[prop]
//         t.field(name, { type })
//       }
//     }
//   })
// }

// export const NProjectOwner = createObjectTypeFromPrisma(ProjectOwner, [
//   'id',
//   'email',
//   'login',
//   'name',
//   'avatarUrl',
//   'description',
//   'createdAt',
//   'updatedAt',
//   'disabled',
//   'location'
// ])
