import React from 'react'
import { NextPage } from 'next'
import { LayoutNavbar } from '@/common/layouts/LayoutNavbar'
import { AppNavbar } from '@/common/navbar/AppNavbar'
import { queries } from '../../generated/output'
import { gql, useQuery } from '@apollo/client'

const Index: NextPage = () => {
  const query = gql(queries.projectOwner)
  const { data } = useQuery(query, {
    variables: { id: '731c1bdc-fb73-45f1-8ba6-7519e97adde4' }
  })
  return (
    <LayoutNavbar navbar={<AppNavbar />}>hello, this is {data}</LayoutNavbar>
  )
}

export default Index
