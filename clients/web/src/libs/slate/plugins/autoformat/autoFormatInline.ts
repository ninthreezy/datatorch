import { Editor, Range, Transforms } from 'slate'
import { getPointBefore } from '../utils/queries/getPointBefore'
import { getText } from '../utils/queries/getText'
import { AutoformatBaseRule } from './baseRule'

export interface AutoformatInlineBase extends AutoformatBaseRule {
  /**
   * When using `inline` mode – if false, do not format when the string can be trimmed.
   */
  ignoreTrim?: boolean

  /**
   * Lookup for a range between two strings before a location.
   */
  between: [string] | [string, string]
}

export interface AutoformatInlineCustomRule extends AutoformatInlineBase {
  addMark: (editor: Editor) => void
  removeMark: (editor: Editor) => void
}

export const isCustomInlineRule = (
  el: unknown
): el is AutoformatInlineCustomRule => typeof el === 'object' && 'addMark' in el

export const autoformatInline = (
  editor: Editor,
  { between, ignoreTrim, addMark, removeMark }: AutoformatInlineCustomRule
) => {
  const selection = editor.selection as Range

  const startMarkup = between[0]
  const endMarkup = between[0] ?? ''

  let endMarkupPointBefore = selection.anchor
  if (endMarkup) {
    endMarkupPointBefore = getPointBefore(editor, selection, {
      matchString: endMarkup
    })
    if (!endMarkupPointBefore) return false
  }

  const startMarkupPointAfter = getPointBefore(editor, endMarkupPointBefore, {
    matchString: startMarkup,
    skipInvalid: true,
    afterMatch: true
  })

  if (!startMarkupPointAfter) return false

  // found

  const markupRange: Range = {
    anchor: startMarkupPointAfter,
    focus: endMarkupPointBefore
  }

  if (!ignoreTrim) {
    const markupText = getText(editor, markupRange)
    if (markupText.trim() !== markupText) return false
  }

  // delete end markup
  if (endMarkup) {
    endMarkupPointBefore = getPointBefore(editor, selection, {
      matchString: endMarkup
    })
    Transforms.delete(editor, {
      at: {
        anchor: endMarkupPointBefore,
        focus: selection.anchor
      }
    })
  }

  // add mark to the text between the markups
  Transforms.select(editor, markupRange)
  addMark(editor)
  Transforms.collapse(editor, { edge: 'end' })
  removeMark(editor)

  // delete start markup
  const startMarkupPointBefore = getPointBefore(editor, selection, {
    matchString: startMarkup,
    skipInvalid: true
  })
  Transforms.delete(editor, {
    at: {
      anchor: startMarkupPointBefore,
      focus: startMarkupPointAfter
    }
  })

  return true
}
