import React from 'react'
import { NextPage } from 'next'
import { LayoutNavbar } from '@/common/layouts/LayoutNavbar'
import { AppNavbar } from '@/common/navbar/AppNavbar'
import { useProjectOwnerQuery } from '@/generated/graphql'

const Index: NextPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const response = useProjectOwnerQuery({
    variables: {
      id: 'mockid'
    }
  })
  return <LayoutNavbar navbar={<AppNavbar />}>hello</LayoutNavbar>
}

export default Index
