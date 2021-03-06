import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { AppNavbar } from '@/common/navbar/AppNavbar'
import { LayoutNavbarSidebar } from '@/common/layouts/LayoutNavbarSidebar'
import { ProjectSidebar } from './ProjectSidebar'
import { useScrollBarTheme } from '@/libs/hooks/useScrollbarTheme'

export const ProjectLayout: React.FC<BoxProps> = ({ children, ...props }) => {
  const scrollCss = useScrollBarTheme()
  return (
    <LayoutNavbarSidebar
      navbar={AppNavbar}
      sidebar={<ProjectSidebar />}
      contentContainer={{ css: scrollCss, ...props }}
    >
      {children}
    </LayoutNavbarSidebar>
  )
}
