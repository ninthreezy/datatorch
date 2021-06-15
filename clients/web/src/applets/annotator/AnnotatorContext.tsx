import { createPanelContext } from '@/libs/panels'
import { useContext } from 'react'

export interface AnnotatorContext {
  file: {
    url: string
    blob: Blob | null
    mimeType?: string
  }
  tool?: {
    name: string
  }
}

export interface AnnotatorConfig {
  options?: null
}

const defaultContext: AnnotatorContext = {
  file: { url: 'https://i.picsum.photos/id/0/200/300.jpg', blob: null }
}
const defaultConfig: AnnotatorConfig = {}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {}

const updateContext = NOOP
const updateConfig = NOOP
const activePanelRenderer = () => (
  <span>Default active panel context render.</span>
)

export const AnnotatorPanel = createPanelContext<
  AnnotatorContext,
  AnnotatorConfig
>({
  context: defaultContext,
  updateContext,

  config: defaultConfig,
  updateConfig,

  activePanelName: '',
  activePanelRenderer
})

export const useAnnotator = () => {
  return useContext(AnnotatorPanel)
}
