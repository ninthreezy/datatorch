import castArray from 'lodash/castArray'
import { SlatePlugin } from '../../core'
import { isCollapsed } from '../utils/queries/isCollapsed'
import {
  autoformatInline,
  AutoformatInlineCustomRule,
  isCustomInlineRule
} from './autoFormatInline'

export type AutoformatRule = AutoformatInlineCustomRule

export interface WithAutoformatOptions {
  rules: AutoformatRule[]
}

let instanceCounter = 0
export const AutoFormatPlugin = ({
  rules
}: WithAutoformatOptions): SlatePlugin => {
  return {
    id: `autoformat-${++instanceCounter}`,
    editor: editor => {
      const { insertText } = editor

      editor.insertText = text => {
        if (!isCollapsed(editor.selection)) return insertText(text)
        for (const rule of rules) {
          const { trigger = ' ' } = rule
          const triggers: string[] = castArray(trigger)

          // Check trigger
          if (!triggers.includes(text)) continue

          // const { markup } = rule
          // const markups: string[] = castArray(markup)

          // const [, path] = Editor.above(editor, {
          //   match: n => Editor.isBlock(editor, n)
          // })
          // const anchor = Editor.start(editor, path)
          // const focus = editor.selection.anchor
          // const rangeFromBlockStart = { anchor, focus } as Range
          // const textFromBlockStart = getText(editor, rangeFromBlockStart)

          const { insertTrigger } = rule
          const valid = () => insertTrigger && insertText(text)
          if (isCustomInlineRule(rule) && autoformatInline(editor, rule)) {
            return valid()
          }
        }

        insertText(text)
      }
      return editor
    }
  }
}
