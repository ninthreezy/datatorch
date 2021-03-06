import { ProjectLayout } from '@/applets/projects/layout/ProjectLayout'
import { ProjectHeader } from '@/applets/projects/ProjectPage'
import { Card, CardHeading } from '@/common/Card'
import { LayoutSettings, SettingsButton } from '@/common/layouts/LayoutSettings'
import { isDev } from '@/libs/utils/environment'
import { NextPage } from 'next'
import React from 'react'

const ProjectSettingsHeader: React.FC = () => {
  return <ProjectHeader subtitle="Home" title="Settings"></ProjectHeader>
}

const ProjectSettingsSidebar: React.FC = () => {
  return (
    <>
      <SettingsButton>General</SettingsButton>
      <SettingsButton>Manage access</SettingsButton>
      <SettingsButton>Secrets</SettingsButton>
      <SettingsButton>Dependencies</SettingsButton>
      {isDev() && <SettingsButton>Webhooks</SettingsButton>}
      {isDev() && <SettingsButton>Notifications</SettingsButton>}
    </>
  )
}

const ProjectSettings: NextPage = () => {
  return (
    <ProjectLayout>
      <LayoutSettings
        header={<ProjectSettingsHeader />}
        sidebar={<ProjectSettingsSidebar />}
      >
        <Card>
          <CardHeading>General</CardHeading>
        </Card>
      </LayoutSettings>
    </ProjectLayout>
  )
}

export default ProjectSettings
