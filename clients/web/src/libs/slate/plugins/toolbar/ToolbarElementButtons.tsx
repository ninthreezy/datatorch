// import { TextProps } from '@chakra-ui/react'
// import React, { useCallback } from 'react'

// import { Editor } from 'slate'
// import { useSlate } from 'slate-react'

// export const useTextPropMark = <T extends keyof TextProps>(
//   prop: T,
//   value: TextProps[T]
// ) => {
//   const editor = useSlate()
//   const isActive = Editor.marks(editor)?.[prop] === value

//   const toggleMark = useCallback(
//     (event?: Event | React.UIEvent | React.KeyboardEvent) => {
//       event?.preventDefault()
//       event?.stopPropagation()
//       // const node = Editor.node(editor, editor.selection)
//     },
//     []
//   )

//   return { isActive, toggleMark }
// }

export {}
