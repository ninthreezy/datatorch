import dynamic, { DynamicOptions, Loader } from 'next/dynamic'
import { definePanel, Panel, PanelOptions, PanelProps } from './definePanel'

export type PanelAsyncOptions<Context, Config> = Omit<
  PanelOptions<Context, Config>,
  'Component'
> &
  DynamicOptions<PanelProps<Context, Config>> & {
    loader: Loader<PanelProps<Context, Config>>
  }

export const defineAsyncPanel = <Context, Config>(
  options: PanelAsyncOptions<Context, Config>
): Panel<Context, Config> => {
  return definePanel({ ...options, Component: dynamic(options) })
}
