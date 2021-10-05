import React, { ReactPropTypes, useState } from 'react'
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage
} from 'next'
import { LayoutNavbarSidebar } from '@/common/layouts/LayoutNavbarSidebar'
import { AppNavbar } from '@/common/navbar/AppNavbar'
import {
  Avatar,
  Box,
  Button,
  extendTheme,
  Flex,
  Input,
  Text,
  useColorModeValue as mode,
  Container,
  useBreakpointValue,
  Divider,
  VStack,
  Icon,
  Alert,
  AlertIcon,
  ButtonProps,
  Image,
  Select,
  Stack,
  HStack,
  Textarea,
  Spacer,
  useDisclosure,
  Collapse
} from '@chakra-ui/react'
import {
  FaChevronDown,
  FaList,
  FaNewspaper,
  FaQuestionCircle,
  FaBullhorn,
  FaPlus
} from 'react-icons/fa'
import { UserData } from '@/libs/utils/cookies'
import CreatePost from './createPost'
import { useDiscussionPageContext } from './index'

const iconMap = new Map([
  // eslint-disable-next-line react/jsx-key
  ['discussion', <FaNewspaper />],
  // eslint-disable-next-line react/jsx-key
  ['question', <FaQuestionCircle />],
  // eslint-disable-next-line react/jsx-key
  ['classified', <FaBullhorn />]
])

const DiscussionFilterIcons: React.FC<{ visible }> = ({ visible }) => {
  return visible.map(postType => iconMap.get(postType))
}

const DiscussionToolbar: React.FC<UserData> = ({ ...user }) => {
  const context = useDiscussionPageContext()
  const { isOpen, onToggle } = useDisclosure()
  return (
    <Box>
      {/* Create post pop up */}
      <Collapse in={isOpen} animateOpacity>
        <CreatePost {...user} />
      </Collapse>
      {/* Toolbar */}
      <Flex
        backgroundColor="green.900"
        borderRadius="5px"
        align="center"
        width="100%"
      >
        <Stack
          direction="row"
          spacing={10}
          width="100%"
          align="left"
          wrap="wrap"
        >
          {/*Publication filter*/}
          <Button
            marginLeft={2}
            paddingX={2}
            textAlign="center"
            rightIcon={<FaChevronDown size="10px" />}
            textColor="gray.700"
            variant="ghost"
          >
            <Flex direction="row">
              <FaList />
              <Text paddingLeft={2} maxWidth="400px" overflow="hidden">
                {context.currentPublication}
              </Text>
            </Flex>
          </Button>
          {/*Post type filter: Article, Question, Classified*/}
          <Button
            align="center"
            variant="ghost"
            textColor="gray.700"
            rightIcon={<FaChevronDown size="10px" />}
          >
            <HStack>
              {<DiscussionFilterIcons visible={context.visiblePostTypes} />}
            </HStack>
          </Button>
          {/*Filter selector*/}
          <Button
            rightIcon={<FaChevronDown size="10px" />}
            variant="ghost"
            textColor="gray.700"
          >
            {context.discussionFilter}
          </Button>
          {/*Spacer*/}
          <Spacer />
          {/*Create post button*/}
          <Button
            rightIcon={<FaPlus size="15px" />}
            variant="solid"
            textColor="gray.400"
            borderTopLeftRadius="0px"
            borderBottomLeftRadius="0px"
            onClick={onToggle}
          >
            Create Post
          </Button>
        </Stack>
      </Flex>
    </Box>
  )
}

export default DiscussionToolbar
