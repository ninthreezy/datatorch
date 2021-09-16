import React from 'react'
import { createPortal } from 'react-dom'
import { useEvent } from 'react-use'

import { Box } from '@chakra-ui/react'

import { useGoldenLayout, LayoutConfig } from './layout'

import {
  AnnotatorConfig,
  AnnotatorContext,
  AnnotatorPanel
} from '../AnnotatorContext'

import * as panels from '../panels'
import { tabs } from '../tabs'
import { usePanels } from '@/libs/panels/'

const config: LayoutConfig = {
  settings: {
    constrainDragToContainer: false,
    hasHeaders: true,
    reorderEnabled: true,
    popoutWholeStack: false,
    blockedPopoutsThrowError: true,
    closePopoutsOnUnload: true,
    showPopoutIcon: true,
    showMaximiseIcon: true,
    showCloseIcon: true
  },
  header: {
    show: 'top',
  },
  dimensions: {
    borderWidth: 5,
    minItemHeight: 10,
    minItemWidth: 10,
    headerHeight: 20,
    dragProxyWidth: 300,
    dragProxyHeight: 200
  },
  labels: {
    close: 'close',
    maximise: 'maximise',
    minimise: 'minimise',
    popout: 'open in new window'
  },
  root: {
    type: 'row',
    content: [
      //{ type: 'component', componentType: 'Test', width: 1 },
      { type: 'component', componentType: 'TabsList', width: 1 },
      //{ type: 'component', componentType: 'Visualizer' }
    ]
  }
}

export interface AnnotatorProps {
  context: AnnotatorContext
  setContext: (context: AnnotatorContext) => void

  config: AnnotatorContext
  setConfig: (config: AnnotatorConfig) => void

  layout: Omit<LayoutConfig, 'content' | 'labels'>
  setLayout: (layout: LayoutConfig) => void

  setFileStatus: (status: string) => Promise<void>
  updateMetadata: () => Promise<void>

  createAnnotation: () => Promise<void>
  updateAnnotation: (labelId: string) => Promise<void>
  deleteAnnotation: (labelId: string) => Promise<void>

  createSource: () => Promise<void>
  updateSource: (sourceId: string) => Promise<void>
  deleteSource: (sourceId: string) => Promise<void>

  createLabel: () => Promise<void>
  updateLabel: (labelId: string) => Promise<void>
  deleteLabel: (labelId: string) => Promise<void>
}

export const Annotator: React.FC = () => {
  const panel = usePanels<AnnotatorContext, AnnotatorConfig>(
    {
      file: {
        url: 'https://i.picsum.photos/id/0/200/300.jpg?hmac=0pq7Zy79Vy4K-8w1qAMo1ppYmPvl-7lvwSx-LyZ7vNY',
        blob: null
      }
    },
    {},
    panels
  )

  const { element, layout, renderPanels } = useGoldenLayout(config, tabs)
  
  useEvent('resize', () => {
    if (layout.current == null) return
    layout.current.setSize(window.innerWidth, window.innerHeight)
  })

  const componentsToRender = Object.values(renderPanels).map(
    ([Component, container]) =>
      createPortal(<Component layout={layout} />, container)
  )

  return (
    <>
      <AnnotatorPanel.Provider value={panel}>
        {componentsToRender}
      </AnnotatorPanel.Provider>
      <Box ref={element} width="full" height="full" overflow="hidden" />
    </>
  )
}
