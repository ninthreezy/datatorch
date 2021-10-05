import { ProjectOwnerType } from '@shared/db'
import { ApolloError } from 'apollo-server-errors'
import { closestIndexTo } from 'date-fns'
import { idArg, list, mutationField, mutationType, nonNull, objectType, queryField, queryType, stringArg } from 'nexus'
import { ArticleDraft, Project, ProjectOwner} from 'nexus-prisma'
import { resolveConfig } from 'prettier'
import { projectOwnerQuery, projectOwnerType } from './ProjectOwner'

export const articleDraft = objectType({
    name: ArticleDraft.$name,
    description: ArticleDraft.$description,
    definition(t) {
        t.field(ArticleDraft.id)
        t.nonNull.field('author', {
            type: 'ProjectOwner',
            resolve: (parent, _, ctx) => {
                return ctx.db.projectOwner.findUnique({
                    where: { id: parent.authorId || undefined },
                })
            }
        })
        t.field('project',{
            type: 'Project',
            resolve: (parent, _, ctx) => {
                return ctx.db.project.findUnique({
                    where: { id: parent.projectId || undefined} ,
                })
            }
        })
        t.field(ArticleDraft.replacedByArticleDraftId)
        t.field(ArticleDraft.isPublished)
        t.field(ArticleDraft.createdAt)
        t.field(ArticleDraft.lastSaved)
        t.field(ArticleDraft.publishedAt)
        t.field(ArticleDraft.title)
        t.field(ArticleDraft.content)
        //t.field(ArticleDraft.articlePost)
    }
})

// For debugging only delete this eventually
export const getAllArticleDrafts = queryField('getAllArticleDrafts',{
    type: list(ArticleDraft.$name),
    resolve(_root, args, ctx) {
        return ctx.db.articleDraft.findMany()
    }
})

// Get all article drafts by a particular project owner
export const getArticleDraftsByProjectOwner = queryField('getArticleDrafts',{
    type: list(ArticleDraft.$name),
    args: {
        projectOwnerId: nonNull(stringArg())
    },
    resolve(_root, args, ctx) {
        return ctx.db.articleDraft.findMany({
            where: { authorId: args.projectOwnerId }
        })
    }
})

export const createArticleDraft = mutationField('createArticleDraft',{
    type: ArticleDraft.$name,
    args: {
        authorId: nonNull(stringArg()),
        title: stringArg(),
        content: stringArg()
    },
    resolve(parent,args,ctx) {
        return ctx.db.articleDraft.create({
            data: {
                title: args.title,
                content: args.content,
                author: {
                    connect: {
                        id: args.authorId
                    }
                }
            }
        })
    }
})

// export const createArticleDraftForProjectOwner = mutationField('createArticleDraftForProjectOwner',{
//     type:'ArticleDraft',
//     args: {
//         authorId: nonNull(stringArg())
//     },
//     async resolve(_, args, ctx) {
//         // Get project owner ID
//         const currentProjectOwner = await ctx.db.projectOwner.findUnique({
//             where:{ id:args.authorId }
//          })
//          if (!currentProjectOwner) throw new ApolloError('No project owner found with that id')
//          try {
//             return await ctx.db.articleDraft.create({data: {authorId: currentProjectOwner.id}})
//         } catch {
//             throw new ApolloError('Cannot create article draft.')
//         }
//     }
// })

// export const createArticleDraftForProjectOwner = mutationType({
//     definition(t) {
//         t.field('')
//     }
// })

// export const getArticleDraft = queryType({
//     definition(t) {
//         t.field("articleDraft", {
//             type: ArticleDraft,
//             nullable: true,
//             args: {
//                  id: idArg()
//             },
//             resolve: (_root, args, ctx) => {
//                 return ctx.db.articleDraft.findUnique({ where: args })
//             }
//         })
//     }
// })

// export const getArticleDraft = queryField('articleDraft', {
//     type: ArticleDraft.$name,
//     args: {
//         id: nonNull(stringArg()),
//     },
//     resolve(_root, args, ctx) {
//         return ctx.db.articleDraft.findUnique({where: args})
//     }
// })

// export const getArticleDraftsBelongingToProjectOwner = queryField('articleDraft[]', {
//     type: ArticleDraft.$name,
//     args: {
//         author: nonNull(stringArg()),
//     },
//     resolve(_root, args, ctx) {
//         return ctx.db.articleDraft.findMany({where: args})
//     }
// })

// export const createArticleDraftForProjectOwner = mutationField("articleDraft",{
//     type: 'Boolean',
//     async resolve(_root, args, ctx)
// })