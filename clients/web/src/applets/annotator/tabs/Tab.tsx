import {
  Box,
  Text,
  HStack,
  Divider,
  Icon,
  Button,
  IconButton,
  Spacer
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { FaQuestionCircle, FaEllipsisH } from 'react-icons/fa'

export const Tab: React.FC<{
  name: string
  buttonIcon?: any
  buttonText?: string
  componentsToRender?: ReactNode
  heightPx?: number
}> = ({ name, buttonIcon, buttonText, componentsToRender, heightPx = 120 }) => {
  return (
    <Box borderBottom="4px" borderColor="gray.900" mt={2} pb={4}>
      <Box overflow="hidden">
        <Box>
          <HStack height="24px">
            <Text
              fontWeight="bold"
              color="gray.200"
              fontSize="md"
              marginLeft={2}
              marginRight={1}
            >
              {name}
            </Text>
            <Divider orientation="vertical" />
            {buttonIcon != null && (
              <Button variant="outline" border="0px" maxH="24px" px={1}>
                <Icon as={buttonIcon} aria-label="icon" color="gray.500" />
                <Text
                  fontWeight="normal"
                  color="gray.500"
                  fontSize="sm"
                  marginLeft={2}
                >
                  {buttonText}
                </Text>
              </Button>
            )}
            <Spacer />
            <IconButton
              aria-label="help"
              icon={<FaEllipsisH />}
              variant="outline"
              color="gray.500"
              borderWidth="0px"
              margin="0px"
              padding="0px"
              size="xs"
              maxH="20px"
              maxW="7px"
            ></IconButton>
            <IconButton
              aria-label="help"
              icon={<FaQuestionCircle />}
              variant="outline"
              color="gray.500"
              borderWidth="0px"
              size="xs"
              maxH="20px"
              maxW="7px"
            ></IconButton>
          </HStack>
          <Divider marginBottom={1} />
        </Box>
        <Box
          p={1}
          overflow="scroll"
          minHeight={String(heightPx) + 'px'}
          maxHeight={String(heightPx) + 'px'}
          boxShadow="inset 4px 3px 10px 12px rgba(0, 0, 0, 0.05)"
        >
          {componentsToRender}
        </Box>
      </Box>
    </Box>
  )
}
