import React from 'react'
import { NextPage } from 'next'
import { ProjectLayout } from '@/applets/projects/layout/ProjectLayout'
import { ProjectHeader } from '@/applets/projects/ProjectPage'
import { Container } from '@chakra-ui/react'

const ProjectDataset: NextPage = () => {
  return (
    <ProjectLayout>
      <Container maxWidth="6xl">
        <ProjectHeader subtitle="Home" title="Datasets" />
      </Container>
    </ProjectLayout>
  )
}

export default ProjectDataset
