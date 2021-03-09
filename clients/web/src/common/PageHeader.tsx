import {
  Box,
  BoxProps,
  Text,
  Flex,
  Heading,
  Icon,
  IconButton
} from '@chakra-ui/react'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

export type PageHeaderProps = BoxProps & {
  subtitle?: string
  title?: React.ReactNode
  footer?: React.ReactNode
  header?: React.ReactNode
  extra?: React.ReactNode
  subTitle?: React.ReactNode
  onBack?(): void
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  header,
  title,
  subtitle,
  extra,
  footer,
  onBack,
  ...props
}) => {
  return (
    <Box {...props}>
      {header}
      <Flex alignItems="center">
        {onBack && (
          <IconButton
            aria-label="back"
            variant="ghost"
            onClick={onBack}
            icon={<Icon as={FaArrowLeft} />}
            marginRight={2}
          />
        )}
        <Heading
          as="h1"
          fontSize="3xl"
          letterSpacing="wide"
          flexGrow={{ base: 1, md: 0 }}
        >
          {title}
        </Heading>
        <Text
          visibility={{ base: 'hidden', md: 'visible' }}
          marginX={4}
          flexGrow={1}
          color="gray.500"
        >
          {subtitle}
        </Text>
        <Box>{extra}</Box>
      </Flex>
      {footer}
    </Box>
  )
}
