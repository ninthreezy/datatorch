import { defineAsyncPanel } from '../../../core/defineAsyncPanel'
import { context } from './context'

export const PanelProteinDataBank = defineAsyncPanel({
  displayName: 'Molecule (PDB)',
  context,
  relevance: 150,
  loader: () => import('./PanelProteinDataBank')
})

export * from './context'
