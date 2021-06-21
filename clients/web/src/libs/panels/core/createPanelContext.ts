import { createContext } from 'react'
import { UpdateFunction } from './definePanel'

export interface PanelContext<Context, Config> {
  context: Context
  updateContext: UpdateFunction<Context>

  config: Config
  updateConfig: UpdateFunction<Config>

  activePanelName: string
  activePanelRenderer: () => JSX.Element
}

export const createPanelContext = <Context, Config>(
  defaultValue: PanelContext<Context, Config>
) => {
  return createContext<PanelContext<Context, Config>>(defaultValue)
}
