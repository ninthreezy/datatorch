import React from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Icon,
  Tooltip
} from '@chakra-ui/react'

import {
  MdFilter,
  MdPermDataSetting,
  MdInsertDriveFile,
  MdViewCarousel
} from 'react-icons/md'

const Header: React.FC = () => {
  return (
    <Box height="35px" paddingBottom="4px" backgroundColor="gray.900">
      <Flex
        backgroundColor="gray.800"
        height="full"
        alignItems="center"
        paddingX="2"
      >
        <Breadcrumb fontWeight="medium" fontSize="sm">
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              <Tooltip hasArrow label="Project">
                <Button
                  leftIcon={<Icon as={MdViewCarousel} />}
                  size="sm"
                  variant="ghost"
                >
                  Project
                </Button>
              </Tooltip>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              <Tooltip hasArrow label="Dataset">
                <Button
                  leftIcon={<Icon as={MdPermDataSetting} />}
                  size="sm"
                  variant="ghost"
                >
                  Dataset
                </Button>
              </Tooltip>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              <Button
                leftIcon={<Icon as={MdFilter} />}
                size="sm"
                variant="ghost"
              >
                Filter
              </Button>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">
              <Tooltip hasArrow label="Current file">
                <Button
                  leftIcon={<Icon as={MdInsertDriveFile} />}
                  size="sm"
                  variant="ghost"
                  isActive
                >
                  Filename.jpg
                </Button>
              </Tooltip>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>
    </Box>
  )
}

const Annotator = dynamic(() => import('@/applets/annotator'), {
  ssr: false
})

const Annotate: NextPage = () => {
  return (
    <>
      <Header />
      <Box width="100vw" height="calc(100vh - 35px)">
        <Annotator />
      </Box>
    </>
  )
}

export default Annotate
