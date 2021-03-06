import { useEditorKeyDownEvent } from '../../core'
import isHotkey from 'is-hotkey'

export const useEditorHotKey = (
  hotkey: string,
  handler: (e: React.KeyboardEvent<HTMLDivElement>) => void
) => {
  useEditorKeyDownEvent(e => {
    if (isHotkey(hotkey, e as any)) handler(e)
  })
}
