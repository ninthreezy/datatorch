import {
  arg,
  enumType,
  extendType,
  FieldResolver,
  inputObjectType,
  NexusNonNullDef,
  nonNull,
  ObjectDefinitionBlock,
  OutputDefinitionBlock
} from 'nexus/dist/core'
import { objectType } from 'nexus'
import { Prisma } from '@shared/db'
import { NexusGenObjects } from '@api/generated/typing'
import { FieldAuthorizeResolver } from 'nexus/dist/plugins/fieldAuthorizePlugin'

const PrismaSchema = Prisma.dmmf.schema

type EntityProperty = {
  type: NexusNonNullDef<any>
  name: string
  description?: string
  resolve: FieldResolver<any, any>
}

interface NexusPrismaEntity {
  $name: string
  $description?: string
  [prop: string]: EntityProperty | any
}

type NexusPrismaEntityProperties<E extends NexusPrismaEntity> = Array<
  Exclude<keyof E, '$name' | '$description'>
>

/**
 * Makes the first char of the string lowercase
 */
const firstLower = (v: string) => v.charAt(0).toLowerCase() + v.slice(1)

/**
 * Gets entity input object type information from DMMF
 */
const getEntityInputObjectTypes = (inputName: string) => {
  const input = PrismaSchema.inputObjectTypes.prisma.find(
    s => s.name === inputName
  )
  if (input == null)
    throw new Error(`Could not find unique input ${inputName} in DMF`)
  return input
}

/**
 * Creates an input graphql object from the DMMF
 */
const createGraphqlInputFromPrisma = (
  entity: NexusPrismaEntity,
  inputName: string,
  options?: { exclude?: (string | number | symbol)[] }
) => {
  const inputObject = getEntityInputObjectTypes(inputName)

  return inputObjectType({
    name: inputName,
    definition(t) {
      for (const field of inputObject.fields) {
        const { name, isRequired, inputTypes } = field
        if (options?.exclude != null && options.exclude.includes(name)) continue

        // Only handle more then just scalar and enumTypes
        const inputType = inputTypes.find(
          s =>
            (s.location === 'scalar' || s.location === 'enumTypes') && !s.isList
        )
        if (inputType == null) continue

        // Use the nexus entity to get the property graphql type
        const entityProperty = entity[name]
        const fieldProps = {
          type: entityProperty.type?.ofNexusType
        }
        isRequired
          ? t.nonNull.field(name, fieldProps)
          : t.field(name, fieldProps)
      }
    }
  })
}

/**
 * Create a GraphQL enum from an enum defined in Prisma
 */
const createGraphqlEnumFromPrisma = (name: string) => {
  const enumModels = [
    ...PrismaSchema.enumTypes.model,
    ...PrismaSchema.enumTypes.prisma
  ]
  const e = enumModels.find(e => e.name === name)
  if (e == null) throw new Error(`Could not find ${name} enum in prisma`)
  return enumType({
    name,
    members: Object.fromEntries(e.values.map(v => [v, v]))
  })
}

/**
 * Create a GraphQL type for a prisma entity
 */
export const entityCreateType = <Entity extends NexusPrismaEntity>({
  entity,
  properties,
  definition
}: {
  entity: Entity
  properties: NexusPrismaEntityProperties<Entity>
  definition?: (t: ObjectDefinitionBlock<string>) => void
}) => {
  const enumModels = PrismaSchema.enumTypes.model
  const enumsToCreate = properties
    .map(p => entity[p]?.type?.ofNexusType)
    .map(name => enumModels.find(e => e.name == name))
    .filter(p => p != null)
    .map(({ name }) => createGraphqlEnumFromPrisma(name))

  return [
    ...enumsToCreate,
    objectType({
      name: entity.$name,
      description: entity.$description,
      definition(t) {
        for (const prop of properties) {
          const field = entity[prop]
          if (typeof field === 'string') continue
          const { name, type } = field
          t.field(name, { type })
        }
        definition?.(t)
      }
    })
  ]
}

/**
 * Generates a `findUnique` query in GraphQL for a given entity.
 *
 * It uses the Prisma DMMF to generate the requires unique input.
 */
export function entityReadUnique(
  entity: NexusPrismaEntity,
  options?: {
    definition?: (t: OutputDefinitionBlock<'Query'>) => void
    authorize?: FieldAuthorizeResolver<'Query', any>
  }
) {
  const entityName = entity.$name as keyof NexusGenObjects
  const entityNameCamel = firstLower(entityName)
  const inputName = `${entityName}WhereUniqueInput`
  return {
    input: createGraphqlInputFromPrisma(entity, inputName),
    query: extendType({
      type: 'Query',
      definition(t) {
        t.field(`${entityNameCamel}`, {
          type: entityName,
          args: { input: nonNull(arg({ type: inputName })) },
          authorize: options?.authorize,
          description: `Retrieve a single ${entityName} record by ID or by a unique attribute.`,
          resolve: (_, args, ctx) => ctx.db.project.findUnique({ where: args })
        })
        options?.definition?.(t)
      }
    })
  }
}

/**
 * Generates a `create` mutation in GraphQL for a given entity.
 *
 * It uses the Prisma DMMF to generate the requires unique input.
 */
export function entityCreate<Entity extends NexusPrismaEntity>(
  entity: Entity,
  options?: {
    definition?: (t: OutputDefinitionBlock<'Mutation'>) => void
    exclude?: NexusPrismaEntityProperties<Entity>
    authorize?: FieldAuthorizeResolver<'Mutation', any>
  }
) {
  const entityName = entity.$name as keyof NexusGenObjects
  const entityNameCamel = firstLower(entityName)
  const inputName = `${entityName}CreateInput`

  return {
    input: createGraphqlInputFromPrisma(entity, inputName, {
      exclude: options?.exclude
    }),
    mutation: extendType({
      type: 'Mutation',
      definition(t) {
        t.field(`create${entityName}`, {
          type: entityName,
          authorize: options?.authorize,
          args: { input: nonNull(arg({ type: inputName })) },
          description: `Create a ${entityName}.`,
          resolve: (_, args, ctx) =>
            ctx.db[entityNameCamel].create({ data: args })
        })
        options?.definition?.(t)
      }
    })
  }
}

export function entityDelete<Entity extends NexusPrismaEntity>(
  entity: Entity,
  options?: {
    definition?: (t: OutputDefinitionBlock<'Mutation'>) => void
    authorize?: FieldAuthorizeResolver<'Mutation', any>
  }
) {
  const entityName = entity.$name as keyof NexusGenObjects
  const entityNameCamel = firstLower(entityName)
  const inputName = `${entityName}WhereUniqueInput`

  return {
    mutation: extendType({
      type: 'Mutation',
      definition(t) {
        t.field(`delete${entityName}`, {
          type: entityName,
          authorize: options?.authorize,
          args: { input: nonNull(arg({ type: inputName })) },
          description: `Delete an ${entityName}.`,
          resolve: (_, args, ctx) =>
            ctx.db[entityNameCamel].delete({ where: args })
        })
        options?.definition?.(t)
      }
    })
  }
}
