// import { ProjectOwner as ProjectOwnerEntity } from 'nexus-prisma'
// import {
//   entityCreate,
//   entityCreateType,
//   entityDelete,
//   entityReadUnique
// } from './utils/graphqlPrisma'

// export const ProjectOwnerReadUniqueQuery = entityReadUnique(ProjectOwnerEntity)
// export const ProjectOwnerCreateMutation = entityCreate(ProjectOwnerEntity)
// export const ProjectOwnerDeleteMutation = entityDelete(ProjectOwnerEntity)
// export const ProjectOwner = entityCreateType({
//   entity: ProjectOwnerEntity,
//   properties: [
//     'id',
//     'name',
//     'createdAt',
//     'updatedAt',
//     'disabled',
//     'type',
//     'role'
//   ]
// })

import {
  booleanArg,
  enumType,
  mutationField,
  nonNull,
  objectType,
  queryField,
  stringArg
} from 'nexus'

import { ProjectOwner, Profile, Role, ProjectOwnerType } from 'nexus-prisma'
import argon2 from 'argon2'
import { issueTokens, AuthAction } from '@api/tokens'

export const projectOwner = objectType({
  name: ProjectOwner.$name,
  description: ProjectOwner.$description,
  definition(t) {
    t.id(ProjectOwner.id.name, ProjectOwner.id)
    t.string(ProjectOwner.name.name, ProjectOwner.name)
    t.dateTime(ProjectOwner.createdAt.name, ProjectOwner.createdAt)
    t.dateTime(ProjectOwner.updatedAt.name, ProjectOwner.updatedAt)
    t.dateTime(ProjectOwner.lastSeenAt.name, ProjectOwner.lastSeenAt)
    t.boolean(ProjectOwner.disabled.name, ProjectOwner.disabled)
    t.field(ProjectOwner.type.name, ProjectOwner.type)
    t.field(ProjectOwner.role.name, ProjectOwner.role)
  }
})

export const profile = objectType({
  name: Profile.$name,
  description: Profile.$description,
  definition(t) {
    t.id(Profile.id.name, Profile.id)
    t.string(Profile.publicEmail.name, Profile.publicEmail)
    t.string(Profile.company.name, Profile.company)
    t.string(Profile.avatarUrl.name, Profile.avatarUrl)
    t.string(Profile.websiteUrl.name, Profile.websiteUrl)
    t.string(Profile.description.name, Profile.description)
    t.string(Profile.location.name, Profile.location)
    t.string(Profile.githubId.name, Profile.githubId)
    t.string(Profile.facebookId.name, Profile.facebookId)
    t.string(Profile.twitterId.name, Profile.twitterId)
  }
})

export const projectOwnerQuery = queryField('projectOwner', {
  type: ProjectOwner.$name,
  args: {
    id: nonNull(stringArg())
  },
  resolve(_root, args, ctx) {
    return ctx.db.projectOwner.findUnique({ where: args })
  }
})

export const viewerQuery = queryField('viewer', {
  type: 'ViewerPayload',
  resolve(_root, _, ctx) {
    const login = ctx.request.user.login
    return { login }
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
    t.string('userId')
  }
})

export const ViewerPayload = objectType({
  name: 'ViewerPayload',
  definition(t) {
    t.string('login')
  }
})

// Register
export const register = mutationField('register', {
  type: 'AuthPayload',
  args: {
    email: nonNull(stringArg()),
    login: nonNull(stringArg()),
    name: stringArg(),
    password: nonNull(stringArg())
  },
  async resolve(_root, args, ctx) {
    const hashedPassword = await argon2.hash(args.password)
    try {
      const projectOwner = await ctx.db.projectOwner.create({
        data: {
          type: 'USER',
          userCredentials: {
            create: {
              email: args.email,
              login: args.login,
              password: hashedPassword
            }
          },
          name: args.name
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

      const authPayload = issueTokens(ctx.reply, userData, AuthAction.REGISTER)
      return authPayload
    } catch (e) {
      throw new Error('Registration failed.')
    }
  }
})

// Login
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
    const authPayload = issueTokens(ctx.reply, userData, AuthAction.LOGIN)

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

// export const viewer = queryField('viewer', {
//   type: 'ProjectOwner',
//   async resolve(_root, _, ctx) {
//     if (ctx.request.user) {
//       const user = ctx.request.user
//       const projectOwner = await ctx.db.projectOwner.findUnique({
//         where: { id: user.userId },
//         include: { profile: true }
//       })
//       ctx.db.projectOwner.update({
//         where: { id: user.userId },
//         data: { lastSeenAt: new Date() }
//       })
//       return projectOwner
//     }
//     return null
//   }
// })
