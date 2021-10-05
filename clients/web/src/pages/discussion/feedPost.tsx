import React, { createContext, useContext } from 'react'
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
  Stack,
  HStack
} from '@chakra-ui/react'
import { useScrollBarTheme } from '@/libs/hooks/useScrollbarTheme'
import { Card } from '@/common/Card'
import {
  FaChevronDown,
  FaList,
  FaNewspaper,
  FaQuestionCircle,
  FaBullhorn
} from 'react-icons/fa'
import { cookieChecker, redirectToLogin, UserData } from '@/libs/utils/cookies'
import { IndexProps } from '../home'
import DiscussionToolbar from './discussionToolbar'

const FeedPost: React.FC<props> = ({ postType, draft }) => {
  if (postType == 'discussion') {
    return (
      <Card marginY={2}>
        <Flex>
          <Image
            boxSize="75px"
            borderRadius="5px"
            src="https://bit.ly/sage-adebayo"
            alt="Segun Adebayo"
          />
          <Stack paddingLeft={5} height="max">
            <Text fontWeight="bold" fontSize="md">
              ARTICLENAME DISCUSSION ARTICLENAME DISCUSSION ARTICLENAME
              DISCUSSION ARTICLENAME DISCUSSION ARTICLENAME DISCUSSION
              ARTICLENAME DISCUSSION
            </Text>
            <Stack direction="row">
              <Box>
                <Text fontSize="xs" fontWeight="bold">
                  (PUBLICATIONNAME: SELF/PROJECT) &nbsp;
                </Text>
              </Box>
              <Text fontSize="xs"> c 34&nbsp;</Text>
              <Text fontSize="xs"> LASTACTIVITYTIME ago&nbsp;</Text>
            </Stack>
          </Stack>
        </Flex>
      </Card>
    )
  }
  if (postType == 'question') {
    return (
      <Card marginY={2}>
        <Flex>
          <Stack width="100px">
            <Text fontSize="sm">Q</Text>
            <Text fontSize="sm">V 323</Text>
            <Text fontSize="sm">A 3</Text>
          </Stack>
          <Stack paddingLeft={5} height="max">
            <Text fontWeight="bold" fontSize="md">
              How do I ARTICLENAME QUESTION ARTICLENAME QUESTION ARTICLENAME
              QUESTION ARTICLENAME QUESTION?
            </Text>
            <Stack direction="row">
              <Text fontSize="xs">in &nbsp;</Text>
              <Text fontSize="xs" fontWeight="bold">
                PUBLICATIONNAME &nbsp;
              </Text>
              <Text fontSize="xs"> c 34&nbsp;</Text>
              <Text fontSize="xs"> LASTACTIVITYTIME ago&nbsp;</Text>
            </Stack>
          </Stack>
        </Flex>
      </Card>
    )
  }
  if (postType == 'classified') {
    return (
      <Card marginY={2}>
        <Flex wrap="wrap">
          <Box>
            <Text as="span" fontSize="xs">
              M CLASSTYPE DATEPOSTED&nbsp;
            </Text>
            <Text as="span" fontWeight="bold" fontSize="md">
              Looking for a ARTICLENAME CLASSIFIED ARTICLENAME CLASSIFIED
              ARTICLENAME CLASSIFIED ARTICLENAME CLASSIFIED ARTICLENAME
              CLASSIFIED ARTICLENAME CLASSIFIED
            </Text>
          </Box>
          <Stack direction="row">
            <Box width="95px" />
            <Text fontSize="xs">in &nbsp;</Text>
            <Text fontSize="xs" fontWeight="bold">
              PUBLICATIONNAME &nbsp;
            </Text>
            <Text fontSize="xs"> c 34&nbsp;</Text>
            <Text fontSize="xs"> LASTACTIVITYTIME ago&nbsp;</Text>
          </Stack>
        </Flex>
      </Card>
    )
  }
}
export default FeedPost
