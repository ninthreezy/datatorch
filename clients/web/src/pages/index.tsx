import React from 'react'
import { NextPage } from 'next'
import { LayoutNavbar } from '@/common/layouts/LayoutNavbar'
import { AppNavbar } from '@/common/navbar/AppNavbar'
import { useProjectOwnerQuery } from '../generated/graphql'
import { Container } from '@chakra-ui/layout'

const Index: NextPage = () => {
  const { data, loading, error } = useProjectOwnerQuery({
    variables: { id: '731c1bdc-fb73-45f1-8ba6-7519e97adde4' }
  })

  return (
    <LayoutNavbar navbar={<AppNavbar />}>
      <Container bg="tomato">{JSON.stringify(error)}</Container>
      <Container>
        hello, this is {loading ? 'LOADING' : data?.projectOwner?.name}
      </Container>
    </LayoutNavbar>
  )
}

export default Index
