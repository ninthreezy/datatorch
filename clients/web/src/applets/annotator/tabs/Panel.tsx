import { useAnnotator } from '../AnnotatorContext'

export const Panel: React.FC = () => {
  return useAnnotator().activePanelRenderer()
}
