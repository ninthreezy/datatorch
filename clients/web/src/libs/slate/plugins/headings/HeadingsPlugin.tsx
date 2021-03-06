/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Node, Element, Editor, Transforms } from 'slate'
import { chakra, Heading, HeadingProps } from '@chakra-ui/react'
import { SlatePlugin } from '../../core'
import { isCollapsed } from '../utils/queries/isCollapsed'

export interface HeadingElement
  extends Element,
    Omit<HeadingProps, 'children'> {
  level: number
}

export const isHeading = (el: Node): el is HeadingElement =>
  el.type === 'heading'

export const HeadingsPlugin = (): SlatePlugin => {
  const defaultHeaderStyling = {
    1: { fontSize: '3xl', marginTop: 3 },
    2: { fontSize: '2xl', marginTop: 2 },
    3: { fontSize: 'xl', marginTop: 1 },
    4: { fontSize: 'lg', marginTop: 1 }
  }
  return {
    id: 'headers',
    editor: editor => {
      const { deleteBackward, insertBreak } = editor

      const getHeadingElement = () =>
        Editor.above(editor, { match: n => isHeading(n) })

      /**
       * Covert enters to paragraphs
       */
      editor.insertBreak = () => {
        const { selection } = editor
        const headerElement = getHeadingElement()
        if (isCollapsed(selection) && headerElement != null) {
          const [, path] = headerElement

          const isStartOfHeader = Editor.isStart(editor, selection.anchor, path)
          if (isStartOfHeader) {
            Transforms.insertNodes(
              editor,
              { type: 'paragraph', children: [{ text: '' }] },
              { at: path }
            )
            return
          }

          Transforms.splitNodes(editor, { always: true })
          Transforms.setNodes(editor, { type: 'paragraph' })
          return
        }
        insertBreak()
      }

      /**
       * Covert deletes to paragraphs
       */
      editor.deleteBackward = (...args) => {
        const { selection } = editor
        if (isCollapsed(selection)) {
          const headerElement = getHeadingElement()
          if (headerElement != null) {
            const [, path] = headerElement
            const isStartOfHeader = Editor.isStart(
              editor,
              selection.anchor,
              path
            )
            if (isStartOfHeader) {
              Transforms.setNodes(editor, { type: 'paragraph' })
              return
            }
          }
        }

        deleteBackward(...args)
      }

      return editor
    },
    renderElement: ({ attributes, element, children }) => {
      if (!isHeading(element)) return null
      const headingComponent = chakra[`h${element.level}`]
      const styling = defaultHeaderStyling[element.level]
      return (
        <Heading
          as={headingComponent}
          {...styling}
          {...attributes}
          {...element}
        >
          {children}
        </Heading>
      )
    }
  }
}
