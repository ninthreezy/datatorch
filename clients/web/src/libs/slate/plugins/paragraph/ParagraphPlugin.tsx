/* eslint-disable react-hooks/rules-of-hooks */
import { Node, Element, Text as TextNode, Editor } from 'slate'
import { Code, Text, TextProps } from '@chakra-ui/react'
import { SlatePlugin } from '../../core'
import { useEditor, useSelected } from 'slate-react'
import { isCollapsed } from '../utils/queries/isCollapsed'
import { forwardRef } from 'react'
import { AutoFormatPlugin } from '../autoformat'

export interface TextLeaf extends TextNode, Omit<TextProps, 'children'> {
  text: string
}
export interface CodeLeaf extends TextLeaf {
  code: true
}
export const isText = (el: TextNode): el is TextLeaf => el.text != null
export const isCode = (el: TextNode): el is CodeLeaf => el?.code === true

export interface ParagraphElement extends Omit<TextProps, 'children'>, Element {
  type: 'paragraph'
}

export const isParagraph = (el: Node): el is ParagraphElement =>
  el.type === 'paragraph'

const TextParagraph = forwardRef<
  HTMLParagraphElement,
  TextProps & { element: ParagraphElement }
>(({ children, element, ...props }, ref) => {
  const editor = useEditor()
  const empty = Editor.isEmpty(editor, element)
  const selected = useSelected()
  const showCommandHint = selected && empty && isCollapsed(editor.selection)
  return (
    <Text
      ref={ref}
      marginY={2}
      _before={
        showCommandHint && {
          content: '"  Type \'/\' for commands"',
          position: 'absolute',
          color: 'gray.500',
          fontSize: 'sm'
        }
      }
      {...props}
      {...element}
    >
      {children}
    </Text>
  )
})

/**
 * Adds support for element type `paragraph`
 */
export const ParagraphPlugin = (): SlatePlugin[] => {
  return [
    AutoFormatPlugin({
      rules: [
        {
          between: ['__', '__'],
          insertTrigger: true,
          addMark: editor => editor.addMark('fontWeight', 'bold'),
          removeMark: editor => editor.removeMark('fontWeight')
        },
        {
          between: ['**', '**'],
          insertTrigger: true,
          addMark: editor => editor.addMark('fontWeight', 'bold'),
          removeMark: editor => editor.removeMark('fontWeight')
        },
        {
          between: ['_', '_'],
          insertTrigger: true,
          addMark: editor => editor.addMark('fontStyle', 'italic'),
          removeMark: editor => editor.removeMark('fontStyle')
        },
        {
          between: ['*', '*'],
          insertTrigger: true,
          addMark: editor => editor.addMark('fontStyle', 'italic'),
          removeMark: editor => editor.removeMark('fontStyle')
        },
        {
          between: ['`', '`'],
          insertTrigger: true,
          addMark: editor => editor.addMark('code', true),
          removeMark: editor => editor.removeMark('code')
        },
        {
          between: ['~~', '~~'],
          insertTrigger: true,
          addMark: editor => editor.addMark('textDecoration', 'line-through'),
          removeMark: editor => editor.removeMark('textDecoration')
        }
      ]
    }),
    {
      id: 'paragraph',
      editor: editor => {
        const { isInline } = editor
        editor.isInline = n => (n.code === true ? true : isInline(n))
        return editor
      },
      renderElement: ({ attributes, element, children }) => {
        if (!isParagraph(element)) return

        return (
          <TextParagraph {...attributes} element={element}>
            {children}
          </TextParagraph>
        )
      },
      renderLeaf: ({ attributes, children, leaf }) => {
        if (!TextNode.isText(leaf)) return null
        if (isCode(leaf))
          return (
            <Code {...attributes} {...leaf}>
              {children}
            </Code>
          )
        return (
          <Text as="span" {...attributes} {...leaf}>
            {children}
          </Text>
        )
      }
    }
  ]
}
