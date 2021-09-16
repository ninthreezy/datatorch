import { Box, Text } from '@chakra-ui/react'
import { PanelImage } from '@/libs/panels/common/PanelImage'
import React from 'react'

export const FileQueue: React.FC = () => {
  return (
    <Box p={2} bg='white' borderRadius='md'>
      <Text
        fontWeight="semibold"
        color="gray.400"
        letterSpacing="wider"
        fontSize="sm"
        casing="uppercase"
      >
        File Queue
      </Text>
      PanelImage()
      <Text
        fontWeight="semibold"
        color="gray.400"
        letterSpacing="wider"
        fontSize="sm"
        casing="uppercase"
      >
        No files in queue.
      </Text>
    </Box>
  )
}
