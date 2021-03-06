import { useBusEmit, useBusEvent } from '@/libs/hooks/useBus'
import { Handler } from 'mitt'
import { EditableProps } from 'slate-react/dist/components/editable'

export function useEditorEmitter(): Partial<EditableProps> {
  const onKeyDown = useBusEmit<React.KeyboardEvent<HTMLDivElement>>('onKeyDown')
  const onDOMBeforeInput = useBusEmit<Event>('onDOMBeforeInput')
  const onClick = useBusEmit<React.MouseEvent<HTMLDivElement, MouseEvent>>(
    'onClick'
  )
  return { onKeyDown, onClick, onDOMBeforeInput }
}

export const useEditorKeyDownEvent = (
  func: Handler<React.KeyboardEvent<HTMLDivElement>>
) => {
  return useBusEvent('onKeyDown', func)
}

export const useEditorClickEvent = (
  func: Handler<React.MouseEvent<HTMLDivElement, MouseEvent>>
) => {
  return useBusEvent('onClick', func)
}
