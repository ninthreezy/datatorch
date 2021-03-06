import { createContext } from 'react'
import { Panel, UpdateFunction } from './definePanel'

export interface PanelContext<Context, Config> {
  context: Context
  updateContext: UpdateFunction<Context>

  config: Config
  updateConfig: UpdateFunction<Config>

  activePanelRenderer: () => JSX.Element
  panelRender: (panel: Panel<any, any>, fallback?: React.FC) => JSX.Element
}

export const createPanelContext = <Context, Config>(
  defaultValue: PanelContext<Context, Config>
) => {
  return createContext<PanelContext<Context, Config>>(defaultValue)
}
