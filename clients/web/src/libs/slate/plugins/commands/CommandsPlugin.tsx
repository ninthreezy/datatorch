/* eslint-disable react-hooks/rules-of-hooks */
import { KeyboardEvent, useCallback, useState } from 'react'
import { SlatePlugin, useEditorKeyDownEvent } from '../../core'
import { CommandsMenu } from './CommandsMenu'

export const CommandsPlugin = (): SlatePlugin => {
  return {
    id: 'commands',
    render({ children, readOnly }) {
      const [isOpen, setIsOpen] = useState(false)

      const onKeyPressEvent = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
          if (event.key !== '/') return
          setIsOpen(true)
        },
        []
      )
      useEditorKeyDownEvent(onKeyPressEvent)

      return (
        <>
          {!readOnly && (
            <CommandsMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
          )}
          {children}
        </>
      )
    }
  }
}
