import { TextProps } from '@chakra-ui/react'
import React, { memo, useCallback } from 'react'
import {
  FaBold,
  FaCode,
  FaItalic,
  FaStrikethrough,
  FaUnderline
} from 'react-icons/fa'
import { Editor } from 'slate'
import { useSlate } from 'slate-react'
import { ToolbarButton } from './ToolbarButton'
import { useEditorHotKey } from './utils'

const useTextPropMark = <T extends keyof TextProps>(
  prop: T,
  value: TextProps[T]
) => {
  const editor = useSlate()
  const isActive = Editor.marks(editor)?.[prop] === value

  const toggleMark = useCallback(
    (event?: Event | React.UIEvent | React.KeyboardEvent) => {
      event?.preventDefault()
      event?.stopPropagation()

      isActive
        ? Editor.removeMark(editor, prop)
        : Editor.addMark(editor, prop, value)
    },
    [prop, value, editor, isActive]
  )

  return { isActive, toggleMark }
}

export const BoldButton = memo(() => {
  const { isActive, toggleMark } = useTextPropMark('fontWeight', 'bold')
  useEditorHotKey('ctrl+b', toggleMark)
  return (
    <ToolbarButton
      icon={FaBold}
      isActive={isActive}
      name="Bold"
      shortcut="Ctrl+B"
      onMouseDown={toggleMark}
    />
  )
})

export const UnderlineButton = memo(() => {
  const { isActive, toggleMark } = useTextPropMark(
    'textDecoration',
    'underline'
  )
  useEditorHotKey('ctrl+u', toggleMark)
  return (
    <ToolbarButton
      icon={FaUnderline}
      isActive={isActive}
      name="Underline"
      shortcut="Ctrl+U"
      onMouseDown={toggleMark}
    />
  )
})

export const ItalicsButton = memo(() => {
  const { isActive, toggleMark } = useTextPropMark('fontStyle', 'italic')
  useEditorHotKey('ctrl+i', toggleMark)
  return (
    <ToolbarButton
      icon={FaItalic}
      isActive={isActive}
      name="Italic"
      shortcut="Ctrl+I"
      onMouseDown={toggleMark}
    />
  )
})

export const StrikeThroughButton = memo(() => {
  const { isActive, toggleMark } = useTextPropMark(
    'textDecoration',
    'line-through'
  )
  useEditorHotKey('ctrl+shift+s', toggleMark)
  return (
    <ToolbarButton
      icon={FaStrikethrough}
      isActive={isActive}
      name="Strike-through"
      shortcut="Ctrl+Shift+S"
      onMouseDown={toggleMark}
    />
  )
})

export const CodeButton = memo(() => {
  const { isActive, toggleMark } = useTextPropMark('code' as any, true)
  useEditorHotKey('ctrl+e', toggleMark)
  return (
    <ToolbarButton
      icon={FaCode}
      isActive={isActive}
      name="Code"
      shortcut="Ctrl+E"
      onMouseDown={toggleMark}
    />
  )
})

// export const EquationButton = memo(() => {
//   const { isActive, toggleMark } = useTextPropMark('equation' as any, true)
//   useEditorHotKey('ctrl+shift+e', toggleMark)
//   return (
//     <ToolbarButton
//       icon={FaSquareRootAlt}
//       isActive={isActive}
//       name="Code"
//       shortcut="Ctrl+Shift+E"
//       onMouseDown={toggleMark}
//     />
//   )
// })
