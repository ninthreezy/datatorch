import React from 'react'
import { FaFill, FaPen, FaPuzzlePiece } from 'react-icons/fa'
import {
  Flex,
  Icon,
  IconButton,
  IconButtonProps,
  Tooltip
} from '@chakra-ui/react'
import { useAnnotator } from '../AnnotatorContext'

type ToolButtonProps = Omit<IconButtonProps, 'aria-label'> & { label: string }
const ToolButton: React.FC<ToolButtonProps> = ({ label, ...rest }) => {
  return (
    <Tooltip label={label} placement="right">
      <IconButton {...rest} aria-label={label} variant="ghost" size="sm" />
    </Tooltip>
  )
}

export const Tools: React.FC = () => {
  const { activePanelName } = useAnnotator()
  return (
    <Flex direction="column">
      {activePanelName}
      <ToolButton label="Pen" icon={<Icon as={FaPen} />} />
      <ToolButton label="Fill" icon={<Icon as={FaFill} />} />
      <ToolButton label="Superpixel" icon={<Icon as={FaPuzzlePiece} />} />
      {/* <Divider my={2} /> */}
    </Flex>
  )
}
