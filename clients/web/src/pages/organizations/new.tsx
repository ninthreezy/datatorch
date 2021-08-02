import { OrganizationCreateForm } from '@/applets/organizations/OrganizationCreateForm'
import { Card } from '@/common/Card'
import { LayoutNavbar } from '@/common/layouts/LayoutNavbar'
import { AppNavbar } from '@/common/navbar/AppNavbar'
import { Container } from '@chakra-ui/react'
import { NextPage } from 'next'
import React from 'react'

const NewOrganizationPage: NextPage = () => {
  return (
    <LayoutNavbar navbar={<AppNavbar />}>
      <Container maxW="2xl" marginTop={10}>
        <Card>
          <OrganizationCreateForm />
        </Card>
      </Container>
    </LayoutNavbar>
  )
}

export default NewOrganizationPage
