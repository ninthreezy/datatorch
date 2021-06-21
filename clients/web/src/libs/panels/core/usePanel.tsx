import React, { useMemo, useState } from 'react'
import merge from 'lodash/merge'

import { Panel } from './definePanel'
import { DeepPartial } from './utils'
import { Center, Text } from '@chakra-ui/react'

export type PanelsMap = Record<string, Panel<any, any>>

export function isAvailable(context: unknown, panel: Panel<unknown, unknown>) {
  const available = panel.available != null ? panel.available : () => true
  return panel.context.guard(context) && available(context)
}

const usePanelCreator = <Context, Config>(
  defaultContext: Context,
  defaultConfig: Config
) => {
  const [context, setContext] = useState(defaultContext)
  const updateContext = (newContext: DeepPartial<Context>) =>
    setContext(merge({ ...context }, newContext))

  const [config, setConfig] = useState(defaultConfig)
  const updateConfig = (newConfig: DeepPartial<Config>) =>
    setConfig(merge({ ...config }, newConfig))

  return { context, setContext, updateContext, config, setConfig, updateConfig }
}

/**
 * Determines panel relevances for the current context.
 * @note relevances is used for sorting order of the available panels.
 */
export function relevances<Context = any>(
  context: Context,
  panel: Panel<Context, unknown>
) {
  return typeof panel.relevance === 'number'
    ? panel.relevance
    : panel.relevance?.(context) ?? 0
}

export const usePanels = <Context, Config>(
  defaultContext: Context,
  defaultConfig: Config,
  panels: PanelsMap,
  options?: { fallback: React.FC }
) => {
  const panelObjects = usePanelCreator<Context, Config>(
    defaultContext,
    defaultConfig
  )
  const { context } = panelObjects

  const available = useMemo(
    () =>
      Object.values(panels)
        .filter(p => isAvailable(context, p))
        .sort((a, b) => relevances(context, b) - relevances(context, a)),
    [panels, context]
  )

  const [activePanelFirst] = available
  const [activePanelName, setActivePanelName] = useState('')

  const ActivePanel =
    (panels[activePanelName] ?? activePanelFirst)?.Component ??
    options?.fallback

  const activePanelRenderer = () =>
    ActivePanel == null ? (
      <Center h="full">
        <Text>No panel available for this context.</Text>
      </Center>
    ) : (
      <ActivePanel {...panelObjects} />
    )

  return {
    ...panelObjects,
    available,
    activePanelName,
    setActivePanelName,
    activePanelRenderer
  }
}
