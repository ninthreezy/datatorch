import { ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react'

export type SlatePlugin<
  OldEditor extends ReactEditor = ReactEditor,
  NewEditor extends ReactEditor = ReactEditor
> = {
  /**
   * Unique identifer for the plugin.
   * @note If a plugin depend on other plugins we use this to make sure the plugin is only loaded once.
   */
  id: string
  [key: string]: any
  editor?: (props: OldEditor) => NewEditor
  renderElement?: (props: RenderElementProps) => JSX.Element | null | undefined
  renderLeaf?: (props: RenderLeafProps) => JSX.Element | null | undefined
  render?: React.FC<{ readOnly?: boolean }>
}
