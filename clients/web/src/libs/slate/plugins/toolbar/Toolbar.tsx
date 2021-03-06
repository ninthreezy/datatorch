import { useMouseDown } from '@/libs/hooks/useMouseDown'
import {
  Box,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack
} from '@chakra-ui/react'
import React, { useState, useRef, useEffect, memo } from 'react'
import { FaChevronDown, FaFont, FaLink } from 'react-icons/fa'

import { useDebounce } from 'react-use'
import { useSlate } from 'slate-react'
import { getSelectionText } from '../utils/queries/getSelectionText'
import { isCollapsed } from '../utils/queries/isCollapsed'
import { EditorMenu } from '../utils/EditorMenu'
import { ElementPosition, getPositionAtSelection } from '../utils/menuPositions'
import { ToolbarButton } from './ToolbarButton'
import {
  BoldButton,
  CodeButton,
  ItalicsButton,
  StrikeThroughButton,
  UnderlineButton
} from './ToolbarMarkButtons'

const ToolbarOptions = memo(() => {
  return (
    <Stack direction="row" spacing={0} whiteSpace="nowrap">
      <ToolbarButton icon={FaLink} name="Link" />

      <Box borderX="1px" color="gray.600">
        <BoldButton />
        <UnderlineButton />
        <ItalicsButton />
        <StrikeThroughButton />
        <CodeButton />
      </Box>

      <Menu isLazy>
        <MenuButton
          as={Button}
          size="sm"
          variant="ghost"
          aria-label="font styles"
          rightIcon={<Icon as={FaChevronDown} w={3} h={3} color="gray" />}
        >
          <Icon as={FaFont} />
        </MenuButton>
        <MenuList>
          <MenuGroup title="Color">
            <MenuItem icon={<Icon as={FaFont} />}>Default</MenuItem>
            <MenuItem icon={<Icon as={FaFont} color="gray" />}>Gray</MenuItem>
            <MenuItem icon={<Icon as={FaFont} color="brown" />}>Brown</MenuItem>
            <MenuItem icon={<Icon as={FaFont} color="orange" />}>
              Orange
            </MenuItem>
            <MenuItem icon={<Icon as={FaFont} color="yellow" />}>
              Yellow
            </MenuItem>
            <MenuItem icon={<Icon as={FaFont} color="green" />}>Green</MenuItem>
            <MenuItem icon={<Icon as={FaFont} color="blue" />}>Blue</MenuItem>
            <MenuItem icon={<Icon as={FaFont} color="purple" />}>
              Purple
            </MenuItem>
            <MenuItem icon={<Icon as={FaFont} color="pink" />}>Pink</MenuItem>
            <MenuItem icon={<Icon as={FaFont} color="red" />}>Red</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Stack>
  )
})

export const Toolbar: React.FC = memo(() => {
  const toolbarRef = useRef<HTMLDivElement>()

  const editor = useSlate()
  const selectionText = getSelectionText(editor)
  const isMouseDown = useMouseDown()

  const [debouncedPosition, setDebouncedPosition] = useState<ElementPosition>()
  const [position, setPosition] = useState<ElementPosition>()
  const [debouncedIsOpen, setDebouncedIsOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  useDebounce(
    () => {
      setDebouncedPosition(position)
      setDebouncedIsOpen(isOpen)
    },
    300,
    [position, isOpen, setDebouncedPosition, setDebouncedIsOpen]
  )

  useEffect(() => {
    const el = toolbarRef.current
    if (el == null) return

    const { selection } = editor
    if (isMouseDown || isCollapsed(selection) || selectionText.length === 0) {
      setIsOpen(false)
      return
    }

    const newPos = getPositionAtSelection(el, {
      direction: 'top',
      align: 'center'
    })
    setIsOpen(true)
    setPosition(newPos)
  }, [editor, selectionText.length, isMouseDown])

  return (
    <EditorMenu
      ref={toolbarRef}
      left={debouncedPosition?.left}
      top={debouncedPosition?.top}
      isOpen={debouncedIsOpen}
    >
      <ToolbarOptions />
    </EditorMenu>
  )
})
