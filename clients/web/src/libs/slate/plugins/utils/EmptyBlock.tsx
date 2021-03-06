import { Box, Flex, FlexProps } from '@chakra-ui/react'
import React, { forwardRef } from 'react'

export const EmptyElement = forwardRef<
  HTMLDivElement,
  FlexProps & { icon: React.ReactNode }
>(({ icon, children, ...flexProps }, ref) => {
  return (
    <Flex
      ref={ref}
      {...flexProps}
      rounded="md"
      bgColor="gray.700"
      padding={3}
      marginY="1"
      alignItems="center"
      userSelect="none"
      contentEditable={false}
      cursor="pointer"
    >
      <Box>{icon}</Box>
      <Box color="gray.400" fontSize="sm" marginLeft="3">
        {children}
      </Box>
    </Flex>
  )
})
