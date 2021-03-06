import React from 'react'
import { Box, Flex, FlexProps } from '@chakra-ui/react'

export const LayoutNavbar: React.FC<{
  navbar?: React.ReactNode
  containerProps?: FlexProps
}> = ({ navbar, children, containerProps }) => {
  return (
    <Flex flexDirection="column" height="100vh">
      <Box flexShrink={0}>{navbar}</Box>
      <Flex overflow="hidden" flexGrow={1}>
        <Flex flexGrow={1} minWidth={0} bgColor="gray.900" {...containerProps}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}
