import {
  Box,
  Flex,
  Text,
  Heading,
  Tag,
  VStack,
  Divider
} from '@chakra-ui/react'
import take from 'lodash/take'
import { useRouter } from 'next/router'
import React from 'react'

export const DatasetListItem: React.FC<{
  id: string
  name: string
  tags: string[]
  description: string
}> = ({ name, tags, description }) => {
  const first5Tags = take(tags, 5)
  const router = useRouter()
  const datasetUrl = `${router.asPath}/${name}`

  return (
    <Flex
      onClick={() => router.push(datasetUrl)}
      rounded="md"
      cursor="pointer"
      padding={2}
      paddingX={3}
      alignItems="center"
      border="1px"
      borderColor="transparent"
      _hover={{ border: '1px', borderColor: 'blue.700' }}
    >
      <Box flexGrow={1} flexShrink={1} minWidth={0}>
        <Flex alignItems="center">
          <Heading as="h4" fontSize="lg" marginY={1} isTruncated>
            {name}
          </Heading>
        </Flex>
        <Text minWidth={0} isTruncated color="gray.400" fontSize="sm">
          {description}
        </Text>
        <Box marginTop="1">
          {first5Tags.map(tag => (
            <Tag key={tag} marginX={0.5} size="sm" colorScheme="blue">
              {tag}
            </Tag>
          ))}
        </Box>
      </Box>
    </Flex>
  )
}

export const DatasetsList: React.FC = () => {
  const datasets = [
    {
      id: '1',
      name: 'Test Dataset',
      description: 'An example dataset with a description',
      tags: ['png', 'multisensor']
    }
  ]
  return (
    <VStack align="stretch" divder={<Divider />}>
      {datasets.map(d => (
        <DatasetListItem key={d.id} {...d}></DatasetListItem>
      ))}
    </VStack>
  )
}
