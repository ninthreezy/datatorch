import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { LayoutNavbar } from '@/common/layouts/LayoutNavbar'
import { AppNavbar } from '@/common/navbar/AppNavbar'
import { useViewerQuery } from '@/generated/graphql'

const Index: NextPage = () => {
  const [login, setLogin] = useState('NOTFOUND')
  const { data } = useViewerQuery()
  useEffect(() => {
    const newLogin = data?.viewer.login ?? 'STILLNOTFOUND'
    setLogin(newLogin)
  }, [data])
  return <LayoutNavbar navbar={<AppNavbar />}>{login}</LayoutNavbar>
}

export default Index
