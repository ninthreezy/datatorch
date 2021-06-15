import React, { createRef, RefObject, useCallback, useRef } from 'react'
import { useMap, useMount } from 'react-use'

import { GoldenLayout, LayoutConfig, LayoutManager } from 'golden-layout'
import { useGoldenLayoutTheme } from './useGoldenLayoutTheme'

export function useGoldenLayout(
  config: LayoutConfig,
  components: Record<string, React.FC<any>>
) {
  const id = useRef(0)
  const element = createRef<HTMLDivElement>()
  const layout = useRef<GoldenLayout | null>(null)

  useGoldenLayoutTheme()

  const [
    renderPanels,
    { set: setPanelToRender, remove: removePanelToRender }
  ] = useMap<
    Record<number, [React.FC<{ layout?: RefObject<GoldenLayout> }>, Element]>
  >({})

  const getComponentEvent: LayoutManager.GetComponentEventHandler = useCallback(
    (container, itemConfig) => {
      const { componentType } = itemConfig
      if (typeof componentType !== 'string')
        throw new Error('Invalid component type.')

      if (components[componentType] == null)
        throw new Error(
          `Found not find component '${componentType}'. Has this component been registered?`
        )

      const Component = components[componentType]
      id.current++
      setPanelToRender(id.current, [Component, container.element])
      return id.current
    },
    [components, setPanelToRender]
  )

  const releaseComponentEvent: LayoutManager.ReleaseComponentEventHandler = useCallback(
    (_, component) => {
      const idx = component as number
      removePanelToRender(idx)
    },
    [removePanelToRender]
  )

  useMount(() => {
    if (element.current == null) throw Error('Element must be set.')
    if (layout.current != null) return

    layout.current = new GoldenLayout(element.current)
    layout.current.getComponentEvent = getComponentEvent
    layout.current.releaseComponentEvent = releaseComponentEvent
    layout.current.loadLayout(config)
  })

  return { element, layout, renderPanels }
}
