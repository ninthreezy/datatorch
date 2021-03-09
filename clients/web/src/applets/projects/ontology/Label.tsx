import {
  Flex,
  FlexProps,
  Icon,
  IconButton,
  IconButtonProps,
  Input,
  InputProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip
} from '@chakra-ui/react'
import React from 'react'
import { FaCog, FaExclamationTriangle, FaGripVertical } from 'react-icons/fa'

export const LabelRowMoveIcon: React.FC<
  Omit<IconButtonProps, 'aria-label'>
> = props => {
  return (
    <IconButton
      aria-label="move"
      variant="ghost"
      size="sm"
      icon={<Icon as={FaGripVertical} />}
      {...props}
    />
  )
}

export const LabelNameInput: React.FC<InputProps> = props => {
  return <Input size="sm" variant="unstyled" {...props} />
}

export type LabelRowProps = {
  isActive?: boolean
} & FlexProps

export const LabelRow: React.FC<LabelRowProps> = ({
  isActive,
  children,
  ...flexProps
}) => {
  return (
    <Flex
      overflow="auto"
      alignItems="center"
      padding={1}
      bgColor={isActive ? 'gray.700' : 'gray.800'}
      rounded="md"
      {...flexProps}
    >
      {children}
    </Flex>
  )
}

export const LabelError: React.FC<{ error?: React.ReactNode }> = ({
  error
}) => {
  return (
    error && (
      <Tooltip label={error} placement="left" bgColor="red.200">
        <IconButton
          marginX={1}
          colorScheme="red"
          variant="ghost"
          aria-label="error message"
          icon={<Icon as={FaExclamationTriangle} />}
        />
      </Tooltip>
    )
  )
}

export const LabelRowSettings: React.FC<{
  name?: string
  isOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}> = ({ name, children, isOpen, onOpen, onClose }) => {
  return (
    <>
      <IconButton
        aria-label="more"
        variant="ghost"
        marginLeft={1}
        isActive={isOpen}
        onClick={() => onOpen()}
        icon={<Icon as={FaCog} />}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Configure &quot;{name}&quot;</ModalHeader>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
