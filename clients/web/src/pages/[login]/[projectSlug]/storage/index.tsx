import { ProjectLayout } from '@/applets/projects/layout/ProjectLayout'
import { ProjectHeader } from '@/applets/projects/ProjectPage'
import { Container } from '@chakra-ui/react'
import React from 'react'

const ProjectStorage: React.FC = () => {
  return (
    <ProjectLayout>
      <Container maxW="6xl">
        <ProjectHeader subtitle="Home" title="Storage" />
      </Container>
    </ProjectLayout>
  )
}

export default ProjectStorage
