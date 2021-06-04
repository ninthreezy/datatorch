import {
  booleanArg,
  enumType,
  mutationField,
  nonNull,
  objectType,
  queryField,
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

export const projectOwnerQuery = queryField('projectOwner', {
  type: PO.$name,
  args: {
    id: nonNull(stringArg())
  },
  async resolve(_root, args, ctx) {
    const projectOwner = await ctx.db.projectOwner.findUnique({
      where: args
    })
    return projectOwner
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

export const register = mutationField('register', {
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
        login: args.login,
        remember: false,
        count: 0
      }

      const authPayload = issueTokens(
        ctx.reply,
        userData,
        LoginOrRegister.REGISTER
      )
      return authPayload
    } catch (e) {
      return null
    }
  }
})

export const login = mutationField('login', {
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
    const valid = await argon2.verify(userCredentials.password, args.password)
    if (!valid) return null

    const userData = {
      userId: userCredentials.projectOwnerId,
      siteRole: userCredentials.projectOwner.role,
      email: userCredentials.email,
      login: userCredentials.login,
      count: userCredentials.count,
      remember: args.remember
    }

    const authPayload = issueTokens(ctx.reply, userData, LoginOrRegister.LOGIN)
    return authPayload
  }
})

export const logout = mutationField('logout', {
  type: 'Boolean',
  resolve(_root, _args, ctx) {
    ctx.reply.clearCookie('refresh-token', { path: '/api' })
    ctx.reply.clearCookie('access-token', { path: '/api' })
    return true
  }
})

export const viewer = queryField('viewer', {
  type: 'Json',
  resolve(_root, args, ctx) {
    if (ctx.request.user) return ctx.request.user
    return null
  }
})
