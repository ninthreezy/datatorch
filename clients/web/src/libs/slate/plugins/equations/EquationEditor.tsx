import {
  Box,
  Button,
  Text,
  Textarea,
  useFocusOnShow,
  useOutsideClick
} from '@chakra-ui/react'
import KaTeX from 'katex'
import React, { memo, useRef, useState } from 'react'
import { useDebounce } from 'react-use'
import { Editor, Transforms } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import { useEditorClickEvent } from '../../core'
import { EditorMenu, useEditorScrollStyle } from '../utils/EditorMenu'
import {
  ElementPosition,
  getElementPositionFromRect
} from '../utils/menuPositions'
import { EquationElement, isEquation } from './nodeTypes'

export const EquationEditor: React.FC = memo(() => {
  const editor = useSlate()
  const [node, setNode] = useState<EquationElement | null>()
  const [equation, setEquation] = useState('')
  const isOpen = node != null

  const equationEditorRef = useRef<HTMLDivElement>()
  const textareaRef = useRef<HTMLTextAreaElement>()

  useFocusOnShow(equationEditorRef, {
    visible: isOpen,
    focusRef: textareaRef,
    shouldFocus: true
  })

  const scrollStyle = useEditorScrollStyle()
  const [position, setPosition] = useState<ElementPosition>()

  const close = () => {
    setNode(null)
    setEquation('')
  }

  useOutsideClick({ ref: equationEditorRef, handler: close })

  const open = (newNode: EquationElement) => {
    if (equationEditorRef.current == null) return
    setNode(newNode)
    const rect = ReactEditor.toDOMNode(editor, newNode).getBoundingClientRect()
    const pos = getElementPositionFromRect(equationEditorRef.current, rect, {
      direction: 'bottom',
      align: 'center'
    })
    setEquation(newNode?.content ?? (newNode as any)?.text ?? '')
    setPosition(pos)
  }

  useEditorClickEvent(() => {
    const nodeEntry = Editor.node(editor, editor.selection)
    if (nodeEntry == null) return
    const [node] = nodeEntry
    if (isEquation(node)) {
      open(node)
      return
    }

    const elementEntry = Editor.above(editor, { match: n => isEquation(n) })
    if (elementEntry == null) return
    const [equationBlock] = elementEntry
    if (!isEquation(equationBlock)) return

    open(equationBlock)
  })

  const [error, setError] = useState('')
  const updateNode = () => {
    if (equationEditorRef.current == null) return
    if (node == null) return

    try {
      KaTeX.renderToString(equation, { throwOnError: true, displayMode: true })

      Transforms.setNodes(
        editor,
        isEquation(node)
          ? { content: equation }
          : { text: equation, equation: true },
        { at: ReactEditor.findPath(editor, node) }
      )
    } catch (ex) {
      setError(ex.message.replace('KaTeX parse error:', '').trim())
    }
  }

  useDebounce(() => updateNode(), 200, [equation])

  return (
    <EditorMenu
      ref={equationEditorRef}
      {...position}
      isOpen={isOpen}
      onKeyDown={e => e.stopPropagation()}
      width={390}
    >
      <Box padding={1}>
        <Textarea
          ref={textareaRef}
          css={scrollStyle as any}
          overflow="auto"
          maxHeight={200}
          placeholder="TeX equation."
          value={equation}
          onChange={e => setEquation(e.target.value)}
          isInvalid={error.length > 0}
        />
        <Text color="red.400" fontSize="xs" paddingBottom={2} paddingX={1}>
          {error}
        </Text>
        <Button
          onClick={close}
          type="submit"
          size="sm"
          variant="outline"
          isFullWidth
          colorScheme="green"
        >
          Done
        </Button>
      </Box>
    </EditorMenu>
  )
})
