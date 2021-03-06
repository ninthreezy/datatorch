import { defineAsyncPanel } from '../../../core/defineAsyncPanel'
import { context } from './context'

export const PanelPointCloudData = defineAsyncPanel({
  displayName: 'PCB Viewer',
  context,
  relevance: 150,
  loader: () => import('./PanelPointCloudData')
})

export * from './context'
