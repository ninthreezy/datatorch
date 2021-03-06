import { defineAsyncPanel } from '../../../core/defineAsyncPanel'
import { context } from './context'

export const PanelImageLeaflet = defineAsyncPanel({
  displayName: 'Large Image',
  context,
  relevance: 15,
  loader: () => import('./PanelImageLeaflet')
})

export * from './context'
