export {}
// import { Editor, Range } from 'slate'
// import { getRangeBefore } from '../utils/queries/getRangeBefore'

// import { autoformatBlock } from './autoFormatBlock'

// /**
//  * Autoformat in the middle of a block
//  */
// export const autoformatInlineBlock = (
//   editor: Editor,
//   {
//     type,
//     markup,
//     preFormat,
//     format
//   }: Pick<AutoformatRule, 'type' | 'markup' | 'preFormat' | 'format'>
// ) => {
//   const markupRange = getRangeBefore(editor, editor.selection as Range, {
//     matchString: markup,
//     skipInvalid: true
//   })

//   if (markupRange) {
//     autoformatBlock(editor, type, markupRange, {
//       preFormat: () => {
//         editor.insertBreak()
//         preFormat?.(editor)
//       },
//       format
//     })

//     return true
//   }
// }
