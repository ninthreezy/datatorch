import React, { useContext } from 'react'
import { AnnotatorPanel } from '../AnnotatorContext'

export const Visualizer: React.FC = () => {
  const { activePanelRenderer } = useContext(AnnotatorPanel)
  return activePanelRenderer()
}
