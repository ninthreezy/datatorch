import React from 'react'
import { SlatePlugin } from '../../core'
import { Toolbar } from './Toolbar'

export const ToolbarPlugin = (): SlatePlugin => {
  return {
    id: 'toolbar',
    render: ({ children }) => {
      return (
        <>
          <Toolbar />
          {children}
        </>
      )
    }
  }
}
