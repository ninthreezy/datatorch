import { defineAsyncPanel } from '@/libs/panels/core'

import { context } from './context'

export const PanelAudioWaveform = defineAsyncPanel({
  displayName: 'Audio Waveform',
  context,
  relevance: 100,
  loader: () => import('./PanelAudioWaveform')
})
