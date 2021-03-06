import React, { useMemo } from 'react'

import { createEditor, Node } from 'slate'
import { Slate, withReact } from 'slate-react'

import mitt from 'mitt'

import { EditablePlugins } from './core/EditablePlugin'
import { pipe } from './core/pipe'
import { SlatePlugin } from './core/plugins'
import { BusProvider } from '../hooks/useBus'
import { withHistory } from 'slate-history'

export const PlugableSlate: React.FC<{
  value: Node[]
  setValue: (nodes: Node[]) => void
  plugins: (SlatePlugin | SlatePlugin[])[]
  readOnly?: boolean
}> = ({ value, setValue, plugins, readOnly }) => {
  const bus = useMemo(() => mitt(), [])
  const pluginsMap = useMemo(
    () => Object.fromEntries(plugins.flat().map(p => [p.id, p])),
    [plugins]
  )
  const pluginsSet = useMemo(() => Object.values(pluginsMap), [pluginsMap])

  const editor = useMemo(
    () =>
      pipe(
        withHistory(withReact(createEditor())),
        ...pluginsSet.filter(p => p.editor != null).map(p => p.editor)
      ),
    [pluginsSet]
  )

  return (
    <BusProvider bus={bus}>
      <Slate editor={editor} value={value} onChange={setValue}>
        <EditablePlugins readOnly={readOnly} plugins={pluginsSet} />
      </Slate>
    </BusProvider>
  )
}
