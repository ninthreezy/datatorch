import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Text,
  useColorModeValue as mode,
  VStack,
  HStack,
  Spacer
} from '@chakra-ui/react'
import { useDiscussionPageContext } from './index'

import { PlugableSlate } from '@/libs/slate'
import { Node } from 'slate'
import { ParagraphPlugin } from '@/libs/slate/plugins/paragraph'
import { HeadingsPlugin } from '@/libs/slate/plugins/headings'
import { EquationsPlugin } from '@/libs/slate/plugins/equations'
import { TweetPlugin } from '@/libs/slate/plugins/tweet'
import { DividerPlugin } from '@/libs/slate/plugins/divider'
import { ToolbarPlugin } from '@/libs/slate/plugins/toolbar'
import { CommandsPlugin } from '@/libs/slate/plugins/commands'
import { UserData } from '@/libs/utils/cookies'

const plugins = [
  HeadingsPlugin(),
  EquationsPlugin(),
  TweetPlugin(),
  DividerPlugin(),
  ToolbarPlugin(),
  CommandsPlugin(),
  ParagraphPlugin()
]

const AuthorTag: React.FC<UserData> = ({ ...user }) => {
  return (
    <Button
      borderRadius="full"
      leftIcon={
        <Avatar
          src="https://bit.ly/sage-adebayo"
          size="xs"
          name="Segun Adebayo"
          ml={-1}
          mr={1}
        />
      }
    >
      {user.login}
    </Button>
  )
}

const CreatePost: React.FC<UserData> = ({ ...user }) => {
  const context = useDiscussionPageContext()
  const initValue: Node[] = [
    {
      type: 'paragraph',
      children: [
        {
          text: ''
        }
      ]
    }
  ]
  const [value, setValue] = useState<Node[]>(initValue)
  return (
    <VStack backgroundColor="gray.800" borderRadius="5" my={2} px={20}>
      {/* Select publication */}
      <HStack paddingTop={20} width="100%" alignItems="end">
        <Text color="gray.400" fontSize="lg">
          For publish in
        </Text>
        <Text color="grey.100" fontSize="lg" fontWeight="bold">
          {context.currentPublication}
        </Text>
      </HStack>
      {/* Title */}
      <HStack width="100%" alignItems="end">
        <Input
          size="lg"
          border="0px"
          placeholder="Title"
          _placeholder={{ color: 'gray.500' }}
          fontWeight="bold"
          backgroundColor="gray.900"
          focusBorderColor="none"
        ></Input>
      </HStack>
      {/* Author and date */}
      <HStack py={3} width="100%">
        <Box flexGrow={1}>
          <AuthorTag {...user} />
        </Box>
        <Box>
          <Text color="gray.400">{new Date().toLocaleDateString()}</Text>
        </Box>
      </HStack>
      {/*Slate*/}
      <Box borderRadius="5px" p={2} minW="100%" backgroundColor="gray.900">
        <PlugableSlate
          value={value}
          setValue={v => setValue(v)}
          plugins={plugins}
          readOnly={false}
        />
      </Box>
      {/*Save Draft and Publish*/}
      <Flex alignItems="end">
        <Spacer />
        <Box>
          <Button
            m={3}
            onClick={() => {
              const content = JSON.stringify(value)
              console.log(content)
            }}
          >
            Save Draft
          </Button>
          <Button onClick={() => console.log(value)}>Publish</Button>
        </Box>
      </Flex>
    </VStack>
  )
}

export default CreatePost
