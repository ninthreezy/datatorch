import React from 'react'
import { NextPage } from 'next'
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
  Divider,
  VStack,
  Icon,
  ButtonProps,
  Heading,
  Spacer,
  Image
} from '@chakra-ui/react'
import { useScrollBarTheme } from '@/libs/hooks/useScrollbarTheme'
import { Card } from '@/common/Card'
import { FaBook } from 'react-icons/fa'
import { SiGraphql } from 'react-icons/si'
import { MdFeedback } from 'react-icons/md'

const FooterButton: React.FC<{ leftIcon?: ButtonProps['leftIcon'] }> = ({
  leftIcon,
  children
}) => {
  return (
    <Button
      variant="ghost"
      isFullWidth
      flexDirection="column"
      alignItems="flex-start"
    >
      <Box>
        {leftIcon}{' '}
        <Text as="span" marginLeft={2}>
          {children}
        </Text>
      </Box>
    </Button>
  )
}

const HomeSidebar: React.FC = () => {
  return (
    <Flex
      backgroundColor={mode('gray.100', 'gray.800')}
      flexDirection="column"
      padding="4"
      width={{ base: null, md: '20em' }}
    >
      <Button
        isFullWidth
        alignItems="flex-start"
        flexDirection="column"
        variant="ghost"
        paddingY={7}
        paddingX={4}
      >
        <Flex alignItems="center">
          <Avatar
            size="sm"
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
          />
          <Text paddingLeft={5}>jsbroks</Text>
        </Flex>
      </Button>

      <Divider marginTop={2} />

      <Box flexGrow={1}>
        <Box paddingTop={8}>
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontWeight="bold" letterSpacing="wider">
              Projects
            </Text>
            <Button size="sm" colorScheme="green">
              New
            </Button>
          </Flex>

          <Input
            size="sm"
            marginY={2}
            variant="filled"
            placeholder="Search projects"
          />
        </Box>

        <Box paddingTop={5}>
          <Text fontSize="sm" fontWeight="bold" letterSpacing="wider">
            Articles
          </Text>

          <Text fontSize="sm" color="gray.400">
            Write articles to share information with your team or the world.
          </Text>
        </Box>

        <Box paddingTop={5}>
          <Text fontSize="sm" fontWeight="bold" letterSpacing="wider">
            Your teams
          </Text>

          <Text fontSize="sm" color="gray.400">
            You are not apart of any teams.
          </Text>
        </Box>
      </Box>

      <Divider marginBottom={2} />

      <Box>
        <VStack alignItems="flex-start" spacing={0}>
          <FooterButton leftIcon={<Icon as={FaBook}></Icon>}>
            Documentation
          </FooterButton>
          <FooterButton leftIcon={<Icon as={SiGraphql}></Icon>}>
            GraphQL
          </FooterButton>
          <FooterButton leftIcon={<Icon as={MdFeedback}></Icon>}>
            Feedback
          </FooterButton>
        </VStack>
      </Box>
    </Flex>
  )
}

const LayoutHome: React.FC = ({ children }) => {
  const scrollCss = useScrollBarTheme()
  return (
    <LayoutNavbarSidebar
      navbar={AppNavbar}
      sidebar={<HomeSidebar />}
      contentContainer={{ css: scrollCss }}
    >
      {children}
    </LayoutNavbarSidebar>
  )
}

const Index: NextPage = () => {
  //const isLg = useBreakpointValue({ base: false, lg: true })
  return (
    <LayoutHome>
      <Flex paddingTop={5}>
        <Container maxWidth="4xl" flexGrow={1}>
          {/* Header and New Org button */}
          <Flex align="center">
            <Heading>Organizations</Heading>
            <Spacer />
            <Button size="sm" colorScheme="green">
              New Organization
            </Button>
          </Flex>

          {/* This section contains a card for each org the user is in */}

          {/* Example of an owner card */}
          <Card marginY={3}>
            <Flex align="center">
              <Image
                fallbackSrc="https://via.placeholder.com/150"
                w="40px"
                objectFit="cover"
              />
              <Text fontSize="md" fontWeight="bold" mx={3}>
                DataTorch
              </Text>
              <Text fontSize="xs">Owner</Text>
              <Spacer />
              <Button size="sm" mx={3}>
                Settings
              </Button>
              <Button size="sm">Leave</Button>
            </Flex>
          </Card>

          {/* Example of a member card */}
          <Card marginY={3}>
            <Flex align="center">
              <Image
                fallbackSrc="https://via.placeholder.com/150"
                w="40px"
                objectFit="cover"
              />
              <Text fontSize="md" fontWeight="bold" mx={3}>
                MeditateAI
              </Text>
              <Text fontSize="xs">Member and Collaborator on 1 project</Text>
              <Spacer />
              <Button size="sm">Leave</Button>
            </Flex>
          </Card>
        </Container>

        {/*isLg && (
          <Box flexShrink={0} width={320}>
            <Text fontWeight="bold" paddingY={3} fontSize="sm">
              Explore Organizations
            </Text>
            Wow so many cool organizations here
          </Box>
        )*/}
      </Flex>
    </LayoutHome>
  )
}
export default Index
