import { ProjectLayout } from '@/applets/projects/layout/ProjectLayout'
import { ProjectHeader } from '@/applets/projects/ProjectPage'
import { SummaryCard } from '@/applets/projects/dashboards/SummaryCard'
import { Button, Container } from '@chakra-ui/react'
import React from 'react'

const ProjectDashboards: React.FC = () => {
  return (
    <ProjectLayout>
      <Container maxW="6xl">
        <ProjectHeader
          title="Dashboards"
          extra={<Button colorSchema="green">New Dashboard</Button>}
        />
        <SummaryCard />
      </Container>
    </ProjectLayout>
  )
}

export default ProjectDashboards
