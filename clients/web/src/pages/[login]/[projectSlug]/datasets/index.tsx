import React from 'react'
import { NextPage } from 'next'
import { ProjectLayout } from '@/applets/projects/layout/ProjectLayout'
import { ProjectHeader } from '@/applets/projects/ProjectPage'
import { Container } from '@chakra-ui/react'
import { DatasetsList } from '@/applets/projects/datasets/DatasetList'
import { Card } from '@/common/Card'

const ProjectDataset: NextPage = () => {
  return (
    <ProjectLayout>
      <Container maxWidth="6xl">
        <ProjectHeader
          subtitle="group and categorize your data"
          title="Datasets"
        />
        <Card padding={2}>
          <DatasetsList />
        </Card>
      </Container>
    </ProjectLayout>
  )
}

export default ProjectDataset
