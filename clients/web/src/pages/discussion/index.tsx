import React, { Context, createContext, useContext } from 'react'
import { GetServerSidePropsContext, NextPage } from 'next'
import { LayoutNavbarSidebar } from '@/common/layouts/LayoutNavbarSidebar'
import { AppNavbar } from '@/common/navbar/AppNavbar'
import {
  useColorModeValue as mode,
  Container,
  useBreakpointValue,
  Flex
} from '@chakra-ui/react'
import { useScrollBarTheme } from '@/libs/hooks/useScrollbarTheme'
import { cookieChecker, redirectToLogin } from '@/libs/utils/cookies'
import { IndexProps } from '../home'
import DiscussionToolbar from './discussionToolbar'
import FeedPost from './feedPost'

export interface DiscussionPageContext {
  currentPublication: string
  visiblePostTypes: Array<string>
  discussionFilter: 'Activity' | 'Created' | 'Upvotes'
  discussionFilterDescending: boolean
}

const DiscussionPageContext: Context<DiscussionPageContext> = createContext({
  currentPublication: 'All',
  visiblePostTypes: ['discussion', 'question', 'classified'],
  discussionFilter: 'Activity',
  discussionFilterDescending: true
})

export const useDiscussionPageContext = () => {
  return useContext(DiscussionPageContext)
}

const LayoutDiscussion: React.FC<IndexProps> = ({ children }) => {
  const scrollCss = useScrollBarTheme()
  return (
    <LayoutNavbarSidebar
      navbar={AppNavbar}
      contentContainer={{ css: scrollCss }}
    >
      {children}
    </LayoutNavbarSidebar>
  )
}

const Discussion: NextPage<IndexProps> = ({ user }) => {
  const isLg = useBreakpointValue({ base: false, lg: true })
  const context = useDiscussionPageContext()

  return (
    <DiscussionPageContext.Provider value={context}>
      <LayoutDiscussion {...user}>
        <Flex paddingTop={5}>
          <Container maxWidth="4xl" flexGrow={1}>
            <DiscussionToolbar {...user} />
            <FeedPost postType="discussion" />
            <FeedPost postType="discussion" />
            <FeedPost postType="classified" />
            <FeedPost postType="question" />
            <FeedPost postType="discussion" />
            <FeedPost postType="classified" />
            <FeedPost postType="discussion" />
            <FeedPost postType="discussion" />
            <FeedPost postType="discussion" />
            <FeedPost postType="classified" />
            <FeedPost postType="discussion" />
            <FeedPost postType="discussion" />
            <FeedPost postType="discussion" />
          </Container>
        </Flex>
      </LayoutDiscussion>
    </DiscussionPageContext.Provider>
  )
}
export default Discussion

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await cookieChecker(context, false)
  if (!user) return redirectToLogin(context.res)
  return {
    props: { user }
  }
}
