import { ProjectLayout } from '@/applets/projects/layout/ProjectLayout'
import { Classification } from '@/applets/projects/ontology/Classification'
import { Instance } from '@/applets/projects/ontology/Instance'
import { ProjectHeader } from '@/applets/projects/ProjectPage'

import {
  Button,
  ButtonProps,
  Container,
  Flex,
  Heading,
  HeadingProps,
  Icon,
  VStack
} from '@chakra-ui/react'
import React from 'react'
import { FaPlus } from 'react-icons/fa'

const LabelTypeHeading: React.FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <Heading
      flexGrow={1}
      fontSize="lg"
      fontWeight="bold"
      letterSpacing="wide"
      marginBottom={2}
      marginTop={4}
      {...props}
    >
      {children}
    </Heading>
  )
}

const LabelTypeHeadingButton: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button
      size="sm"
      variant="ghost"
      leftIcon={<Icon as={FaPlus} />}
      {...props}
    >
      {children}
    </Button>
  )
}

const ProjectOntologies: React.FC = () => {
  return (
    <ProjectLayout>
      <Container maxW="6xl">
        <ProjectHeader
          subtitle="objects and classification to describe your data"
          title="Ontologies"
          extra={<Button>New Ontology</Button>}
        />

        <Flex alignItems="center">
          <LabelTypeHeading>Instances</LabelTypeHeading>
          <LabelTypeHeadingButton>New Instance</LabelTypeHeadingButton>
        </Flex>

        <VStack spacing={2} align="stretch">
          <Instance />
          <Instance />
          <Instance />
        </VStack>

        <Flex alignItems="center" marginTop={6}>
          <LabelTypeHeading>Classification</LabelTypeHeading>
          <LabelTypeHeadingButton>New Classification</LabelTypeHeadingButton>
        </Flex>

        <VStack spacing={2} align="stretch">
          <Classification />
          <Classification />
          <Classification />
          <Classification />
          <Classification />
          <Classification />
          <Classification />
        </VStack>
      </Container>
    </ProjectLayout>
  )
}

export default ProjectOntologies
