import React from 'react'
import { NextPage } from 'next'
import { LayoutNavbar } from '@/common/layouts/LayoutNavbar'
import { AppNavbar } from '@/common/navbar/AppNavbar'

const Index: NextPage = () => (
  <LayoutNavbar navbar={<AppNavbar />}>hello</LayoutNavbar>
)

export default Index
