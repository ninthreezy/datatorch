import React from 'react'
import { NextPage } from 'next'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react'

import { ProjectHeader } from '@/applets/projects/ProjectPage'
import { ProjectLayout } from '@/applets/projects/layout/ProjectLayout'
import { FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa'

const ProjectPipelines: NextPage = () => {
  return (
    <ProjectLayout>
      <Container maxWidth="6xl">
        <ProjectHeader
          subtitle="continuous integration, delivery, and deployment."
          title="Pipelines"
          extra={
            <Button colorScheme="green" size="sm" variant="outline">
              New Pipeline
            </Button>
          }
        />
        <Flex marginY="2" flexDirection="row">
          <Box width={280}>
            <Box marginY="2">
              <Button
                isFullWidth
                marginY={0.5}
                colorScheme="blue"
                variant="ghost"
                flexDirection="column"
                alignItems="flex-start"
                isActive
              >
                Recent Runs
              </Button>
              <Button
                isFullWidth
                color="gray.400"
                marginY={0.5}
                variant="ghost"
                flexDirection="column"
                alignItems="flex-start"
              >
                DEXTR
              </Button>
              <Button
                isFullWidth
                color="gray.400"
                marginY={0.5}
                variant="ghost"
                flexDirection="column"
                alignItems="flex-start"
              >
                Dataset Augmentation
              </Button>
              <Button
                isFullWidth
                color="gray.400"
                marginY={0.5}
                variant="ghost"
                flexDirection="column"
                alignItems="flex-start"
              >
                Dataset Cleaning
              </Button>
            </Box>
          </Box>

          <Box flexGrow={1} marginLeft="10">
            <Box bgColor="gray.800" rounded="md" padding={7}>
              <Heading as="h3" fontSize="2xl" marginBottom={3}>
                Recent Runs
              </Heading>
              <InputGroup variant="filled">
                <InputLeftElement color="gray.300" pointerEvents="none">
                  <Icon as={FaSearch} />
                </InputLeftElement>
                <Input placeholder="Filter pipelines" />
              </InputGroup>
            </Box>

            <Flex justifyContent="center" marginTop="3" color="gray.300">
              <Button
                leftIcon={<Icon as={FaChevronLeft}></Icon>}
                size="sm"
                marginX="2"
                variant="ghost"
                isDisabled
              >
                Previous
              </Button>
              <Button
                rightIcon={<Icon as={FaChevronRight}></Icon>}
                size="sm"
                marginX="2"
                variant="ghost"
              >
                Next
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </ProjectLayout>
  )
}

export default ProjectPipelines
