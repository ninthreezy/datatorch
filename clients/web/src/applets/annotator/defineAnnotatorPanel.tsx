import { Panel } from '@/libs/panels/core/definePanel'
import { defineAnnotatorTool } from './defineAnnotatorTool'

export type AnnotatorPanelOptions<Context, Config> = {
  tools?: Array<ReturnType<typeof defineAnnotatorTool>>
  panel: Panel<Context, Config>
}

export const defineAnnotatorPanel = <Context, Config>(
  options: AnnotatorPanelOptions<Context, Config>
) => options
