import React from 'react'
import { Box, BoxProps, Flex, useBreakpointValue } from '@chakra-ui/react'
import { LayoutNavbar } from './LayoutNavbar'

export const LayoutNavbarSidebar: React.FC<{
  navbar?: React.ElementType
  sidebar?: React.ReactNode
  contentContainer?: BoxProps
}> = props => {
  const { navbar: Navbar, sidebar, children, contentContainer } = props
  const isSm = useBreakpointValue({ base: true, md: false })
  return (
    <LayoutNavbar navbar={<Navbar>{isSm && sidebar}</Navbar>}>
      {!isSm && (
        <Flex
          flexShrink={0}
          backgroundColor="gray.500"
          width="90"
          overflow="hidden"
        >
          {sidebar}
        </Flex>
      )}
      <Flex flexGrow={1} overflow="hidden">
        <Box {...contentContainer} flexGrow={1} overflowY="auto">
          {children}
        </Box>
      </Flex>
    </LayoutNavbar>
  )
}
