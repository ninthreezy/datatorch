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
import { FaUpload } from 'react-icons/fa'

export const UploadModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <IconButton
        size="sm"
        aria-label="File filter"
        marginLeft={0.5}
        variant="ghost"
        icon={<Icon as={FaUpload} />}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Files</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Upload your files here</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
