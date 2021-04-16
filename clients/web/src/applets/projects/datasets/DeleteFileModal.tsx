import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconButton,
  Icon
} from '@chakra-ui/react'
import { FaTrash } from 'react-icons/fa'

export const DeleteFileModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <IconButton
        size="sm"
        aria-label="File filter"
        marginLeft={0.5}
        variant="ghost"
        icon={<Icon as={FaTrash} />}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Files</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete these files?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Delete
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
