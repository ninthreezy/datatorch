import React from 'react'
import {
  Box,
  chakra,
  Container,
  ContainerProps,
  Divider,
  Flex,
  Heading,
  Text
} from '@chakra-ui/react'
import { PageHeader, PageHeaderProps } from '@/common/PageHeader'

export type ProjectHeaderProps = PageHeaderProps & { noDivider?: boolean }

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  noDivider,
  children,
  ...headerProps
}) => {
  return (
    <PageHeader
      paddingTop={8}
      paddingBottom={3}
      {...headerProps}
      footer={
        <>
          {children}
          {!noDivider && <Divider marginY="2" />}
        </>
      }
    />
  )
}

export const ProjectContainer: React.FC<ContainerProps> = ({
  children,
  ...props
}) => (
  <Container maxWidth="6xl" {...props}>
    {children}
  </Container>
)
