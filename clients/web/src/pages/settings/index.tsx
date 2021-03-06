import React from 'react'
import { NextPage } from 'next'

import { Card, CardHeading } from '@/common/Card'
import { SettingsLayout } from '@/applets/settings/SettingsLayout'

const SettingsProfile: NextPage = () => {
  return (
    <SettingsLayout>
      <Card>
        <CardHeading>Public Profile</CardHeading>
      </Card>
      <Card>
        <CardHeading>Profile</CardHeading>
      </Card>
      <Card>
        <CardHeading>Profile</CardHeading>
      </Card>
    </SettingsLayout>
  )
}

export default SettingsProfile
