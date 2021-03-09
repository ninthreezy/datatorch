import { ProjectLayout } from '@/applets/projects/layout/ProjectLayout'
import { ProjectHeader } from '@/applets/projects/ProjectPage'
import { Container } from '@chakra-ui/react'
import React from 'react'

const ProjectFileQueries: React.FC = () => {
  return (
    <ProjectLayout>
      <Container maxW="6xl">
        <ProjectHeader subtitle="Home" title="File Queries" />
      </Container>
    </ProjectLayout>
  )
}

export default ProjectFileQueries
