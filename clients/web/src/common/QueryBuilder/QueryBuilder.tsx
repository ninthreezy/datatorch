import { HStack } from '@chakra-ui/react'
import { Field } from './fieldTypes'

export interface QueryConfig {
  fields: Record<string, Field>
  maxDepth?: number
}

export interface Condition {
  property: string
  operator: string
  value: any
}

export interface Query {
  conjunction: 'and' | 'or'
  queries: Array<Query | Condition>
}

export interface QueryBuilderProps {
  query: Query
  setQuery: (query: Query) => void
  config: QueryConfig
}

export const QueryBuilder: React.FC<QueryBuilderProps> = () => {
  return <HStack spacing={1}></HStack>
}
