import { Box, Text, Image, HStack, VStack, Checkbox } from '@chakra-ui/react'
import React from 'react'
import { FaDatabase } from 'react-icons/fa'
import { Tab } from './Tab'

const DataBrowserEntry = (filename): React.ReactNode => (
  <Box
    as="button"
    p={2}
    width="full"
    backgroundColor="transparent"
    _hover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
    _focus={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
  >
    <HStack>
      <Image
        boxSize="48px"
        minW="48px"
        fallbackSrc="https://via.placeholder.com/48"
        borderRadius="7px"
      ></Image>
      <VStack align="left">
        <Text align="left">{filename}</Text>
        <HStack>
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
        </HStack>
      </VStack>
    </HStack>
  </Box>
)

const endOfList: React.FC = () => (
  <Text
    align="center"
    fontSize="small"
    color="gray.600"
    backgroundColor="rgba(0, 0, 0, 0.1)"
  >
    End of List.
  </Text>
)

const componentsToRender = (): React.ReactNode => {
  return [
    DataBrowserEntry('File 1'),
    DataBrowserEntry('File 2'),
    DataBrowserEntry('File 3'),
    DataBrowserEntry('File 4'),
    DataBrowserEntry('File 5'),
    DataBrowserEntry('File 6'),
    DataBrowserEntry('File 7'),
    endOfList(null)
  ]
}

export const DataBrowser = (): JSX.Element => (
  <Tab
    name={'Data Browser'}
    buttonIcon={FaDatabase}
    buttonText={'Database1'}
    componentsToRender={componentsToRender()}
    heightPx={240}
  />
)
