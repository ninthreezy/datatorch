import React from 'react'
import { Node, Element } from 'slate'
import { Box, Divider, DividerProps } from '@chakra-ui/react'
import { SlatePlugin } from '../../core'

export interface DividerElement
  extends Element,
    Omit<DividerProps, 'children'> {
  type: 'divider'
  level: number
}

export const isDivider = (el: Node): el is DividerElement =>
  el.type === 'divider'

export const DividerPlugin = (): SlatePlugin => {
  return {
    id: 'divider',
    renderElement: ({ attributes, element, children }) => {
      if (!isDivider(element)) return null
      return (
        <Box {...attributes}>
          <Divider {...element} />
          {children}
        </Box>
      )
    }
  }
}
