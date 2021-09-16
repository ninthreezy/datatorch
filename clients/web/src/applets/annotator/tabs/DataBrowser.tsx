import {
  Box,
  Text,
  Image,
  Container,
  HStack,
  Divider,
  Icon,
  Button
} from '@chakra-ui/react'
import { GridLayer } from 'leaflet'

import React from 'react'

import {
  FaLifeRing,
  FaDatabase,
  FaRocket,
  FaArchive,
  FaBrain,
  FaVial,
  FaTags,
  FaHdd,
  FaFolder,
  FaUsers,
  FaThumbtack,
  FaEdit,
  FaCog,
  FaBook,
  FaComment
} from 'react-icons/fa'

interface DataBrowserEntryInput {
  filename: string
}

const DataBrowserEntry = ({ filename }: DataBrowserEntryInput): JSX.Element => (
  <Box>
    <HStack color="white" spacing="12px" p={1}>
      <Image boxSize="48px" minW="48px"></Image>
      <Text>testasdfasdfasdfaskdfsdalkslk</Text>
    </HStack>
  </Box>
)

const DataBrowserHeader = (): JSX.Element => (
  <Box>
    <HStack color="black" spacing="12px">
      <Button
        variant="outline"
        border="0px"
        borderRadius="0px"
        p={0}
        maxH="14px"
      >
        <Icon
          aria-label="Search database"
          icon={<FaDatabase />}
          variant="outline"
          color="gray.400"
          m={0}
          p={0}
        />
        <Text
          aria-label="Current Dataset"
          fontWeight="semibold"
          color="gray.400"
          fontSize="md"
          m={0}
          p={0}
        >
          Dataset 1
        </Text>
      </Button>
    </HStack>
    <Divider />
  </Box>
)

export const DataBrowser: React.FC = () => {
  return (
    <Box bg="transparent">
      <DataBrowserHeader />
      <Box overflow="scroll">
        <DataBrowserEntry filename="file1" />
        <DataBrowserEntry filename="file2" />
        <DataBrowserEntry filename="file3" />
        <DataBrowserEntry filename="file4" />
      </Box>
      <Text
        fontWeight="semibold"
        color="gray.400"
        letterSpacing="wider"
        fontSize="sm"
        casing="uppercase"
      >
        No files in queue.
      </Text>
      <Box></Box>
    </Box>
  )
}
