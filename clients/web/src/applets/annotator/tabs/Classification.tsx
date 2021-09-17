import { Box, Text, HStack, Button, Icon, Divider } from '@chakra-ui/react'
import React from 'react'
import { FaFile } from 'react-icons/fa'

const ClassificationHeader = (): JSX.Element => (
  <Box>
    <HStack height="24px">
      <Text
        fontWeight="bold"
        color="gray.200"
        fontSize="md"
        marginLeft={2}
        marginRight={1}
      >
        Classification
      </Text>
      <Divider orientation="vertical" />
      <Button variant="outline" border="0px" maxH="24px" px={1}>
        <Icon as={FaFile} color="gray.500" />
        <Text
          aria-label="Current Dataset"
          fontWeight="normal"
          color="gray.500"
          fontSize="sm"
          marginLeft={2}
        >
          Filename.jpg
        </Text>
      </Button>
    </HStack>
    <Divider marginBottom={1} />
  </Box>
)

export const Classification: React.FC = () => {
  return (
    <Box>
      <ClassificationHeader />
    </Box>
  )
}
