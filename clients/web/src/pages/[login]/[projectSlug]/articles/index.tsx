import { ArticlesList } from '@/applets/projects/articles/ArticlesList'
import { ProjectLayout } from '@/applets/projects/layout/ProjectLayout'
import { ProjectHeader } from '@/applets/projects/ProjectPage'
import { Card } from '@/common/Card'
import { Container } from '@chakra-ui/react'
import React from 'react'

const ProjectArticles: React.FC = () => {
  return (
    <ProjectLayout>
      <Container maxWidth="6xl">
        <ProjectHeader
          subtitle="share information with others"
          title="Articles"
        />
        <Card padding={2}>
          <ArticlesList />
        </Card>
      </Container>
    </ProjectLayout>
  )
}

export default ProjectArticles
