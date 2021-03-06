import { Box, BoxProps, Heading, HeadingProps } from '@chakra-ui/react'
import React from 'react'

export const CardHeading: React.FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <Heading fontSize="lg" {...props} marginBottom={3} marginTop={0}>
      {children}
    </Heading>
  )
}

export const Card: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box padding={7} rounded="md" bgColor="gray.800" {...props}>
      {children}
    </Box>
  )
}
