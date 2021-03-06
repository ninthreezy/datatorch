import { IconType } from 'react-icons/lib'
import { Transforms, Node, Element as SlateElement, Editor } from 'slate'

export type Command = {
  element?: Partial<SlateElement>
  group: string
  icon: IconType
  name: string
  desc: string
}

export const createNode = (editor: Editor, node: Node) => {
  if (Editor.isInline(editor, node)) {
    Editor.insertNode(editor, node)
    return
  }

  Transforms.setNodes(editor, { ...(node as any) })
}
