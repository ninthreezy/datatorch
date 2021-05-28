import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { Project } from 'nexus-prisma'

export const NProject = objectType({
  name: Project.$name,
  description: Project.$description,
  definition(t) {
    t.id(Project.id.name, Project.id)
    t.string(Project.name.name, Project.name)
    t.string(Project.description.name, Project.description)
  }
})

export const ProjectQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('project', {
      type: Project.$name,
      args: {
        id: nonNull(stringArg())
      },
      resolve(_root, args, ctx) {
        return ctx.db.project.findUnique({ where: args })
      }
    })
  }
})
