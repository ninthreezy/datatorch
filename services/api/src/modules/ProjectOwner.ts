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
import { issueTokens, LoginOrRegister } from '@api/tokens'

export const projectOwner = objectType({
  name: PO.$name,
  description: PO.$description,
  definition(t) {
    t.id(PO.id.name, PO.id)
    t.string(PO.name.name, PO.name)
    t.dateTime(PO.createdAt.name, PO.createdAt)
    t.dateTime(PO.updatedAt.name, PO.updatedAt)
    t.dateTime(PO.lastSeenAt.name, PO.lastSeenAt)
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
      type: 'AuthPayload',
      args: {
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
        login: nonNull(stringArg()),
        password: nonNull(stringArg())
      },
      async resolve(_root, args, ctx) {
        const hashedPassword = await argon2.hash(args.password)
        try {
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

          const userData = {
            userId: projectOwner.id,
            siteRole: projectOwner.role,
            email: args.email,
            login: args.login
          }

          const authPayload = issueTokens({
            reply: ctx.reply,
            userData,
            loginOrRegister: LoginOrRegister.REGISTER,
            count: 0,
            remember: false
          })
          return authPayload
        } catch (e) {
          return null
        }
      }
    })
  }
})

export const login = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('login', {
      type: 'AuthPayload',
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
        const valid = await argon2.verify(
          userCredentials.password,
          args.password
        )
        if (!valid) return null

        const userData = {
          userId: userCredentials.projectOwnerId,
          siteRole: userCredentials.projectOwner.role,
          email: userCredentials.email,
          login: userCredentials.login
        }
        const authPayload = issueTokens({
          reply: ctx.reply,
          userData,
          loginOrRegister: LoginOrRegister.LOGIN,
          count: userCredentials.count,
          remember: args.remember
        })
        return authPayload
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
        ctx.reply.clearCookie('refresh-token', { path: '/api' })
        ctx.reply.clearCookie('access-token', { path: '/api' })
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

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('accessToken')
    t.string('refreshToken')
  }
})

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
