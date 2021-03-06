import React from 'react'

import { SlatePlugin } from '../../core'
import { Equation } from './EquationElement'
import { EquationEditor } from './EquationEditor'
import { isEquation } from './nodeTypes'

/**
 * Must call before paragraphs, since all equation leafs are also valid text
 * leafs.
 */
export const EquationsPlugin = (): SlatePlugin => {
  return {
    id: 'equation',
    render: ({ children }) => {
      return (
        <>
          <EquationEditor />
          {children}
        </>
      )
    },
    editor: editor => {
      const { isVoid, isInline } = editor
      editor.isVoid = el => (isEquation(el) ? true : isVoid(el))
      editor.isInline = el =>
        isEquation(el) ? el.block == null || el.block === false : isInline(el)
      return editor
    },
    renderElement: ({ attributes, element, children }) => {
      if (!isEquation(element)) return null
      return (
        <Equation {...attributes} {...element}>
          {children}
        </Equation>
      )
    }
  }
}
