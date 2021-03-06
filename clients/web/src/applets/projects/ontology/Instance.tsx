import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  useDisclosure
} from '@chakra-ui/react'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import {
  ClassificationConfig,
  ClassificationTypeSelector
} from './Classification'
import {
  LabelNameInput,
  LabelRow,
  LabelRowMoveIcon,
  LabelRowSettings
} from './Label'

export const InstanceAttribute: React.FC = () => {
  return (
    <Box border="1px" rounded="md" borderColor="gray.600" padding={2}>
      <Flex>
        <LabelNameInput variant="filled" marginRight={1} />
        <ClassificationTypeSelector />
      </Flex>
      <ClassificationConfig />
    </Box>
  )
}

export const InstanceConfig: React.FC = () => {
  return (
    <Box>
      <FormControl>
        <FormLabel>Attributes</FormLabel>
        <InstanceAttribute />
      </FormControl>
      <Button
        variant="ghost"
        colorScheme="purple"
        size="sm"
        marginTop={2}
        leftIcon={<Icon as={FaPlus} />}
      >
        Add attributes
      </Button>
    </Box>
  )
}

export const Instance: React.FC = () => {
  const disclosure = useDisclosure()
  const { isOpen } = disclosure
  return (
    <LabelRow isActive={isOpen}>
      <LabelRowMoveIcon />
      <LabelNameInput />
      <LabelRowSettings {...disclosure}>
        <InstanceConfig />
      </LabelRowSettings>
    </LabelRow>
  )
}
