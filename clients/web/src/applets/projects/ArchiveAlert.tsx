import { Alert, AlertIcon, AlertProps } from '@chakra-ui/react'
import React from 'react'

export const ArchiveAlert: React.FC<AlertProps> = props => {
  return (
    <Alert status="warning" rounded="md" {...props}>
      <AlertIcon />
      This project has been archived. Some of the functionality may be limited.
      Check out the Project Archive section in the documentation to learn more.
    </Alert>
  )
}
