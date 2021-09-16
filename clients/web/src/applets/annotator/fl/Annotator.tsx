import React, { RefObject, useRef } from 'react'

import {
  AnnotatorConfig,
  AnnotatorContext,
  AnnotatorPanel
} from '../AnnotatorContext'

import * as panels from '../panels'
import { usePanels } from '@/libs/panels/'
import { Box, Flex } from '@chakra-ui/react'
import { DataBrowser } from '../tabs/DataBrowser'
import { Classification } from '../tabs/Classification'
import { Objects } from '../tabs/Objects'
import { Tools } from '../tabs/Tools'
import { Panel } from '../tabs/Panel'
import { TabsList } from '../tabs/TabsList'
import { Test } from '../tabs/Test'
import { Layout, Model, TabNode, IJsonModel } from 'flexlayout-react'

export interface AnnotatorProps {
  context: AnnotatorContext
  setContext: (context: AnnotatorContext) => void

  config: AnnotatorContext
  setConfig: (config: AnnotatorConfig) => void

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

const jsonLayoutModel: IJsonModel = {
  global: {
    tabEnableFloat: true,
    tabSetEnableMaximize: false,
    splitterSize: 2
  },
  layout: {
    type: 'row',
    id: '#0',
    children: [
      {
        type: 'tabset',
        id: '#1',
        enableDrop: false,
        enableDrag: true,
        enableTabStrip: false,
        width: 40,
        children: [
          {
            type: 'tab',
            id: '#11',
            name: 'tools',
            component: 'Tools',
            enableClose: false,
            config: {
              tabSetEnableTabStrip: false
            }
          }
        ],
        active: false
      },
      {
        type: 'tabset',
        width: 1100,
        id: '#2',
        children: [
          {
            type: 'tab',
            id: '#21',
            name: 'Visualizer',
            component: 'Panel',
            config: {
              id: '2'
            }
          }
        ],
        active: true
      },
      {
        type: 'row',
        id: '#3',
        width: 300,
        children: [
          {
            type: 'tabset',
            id: '#31',
            enableDrop: true,
            enableDrag: true,
            children: [
              {
                type: 'tab',
                id: '#311',
                name: 'New Tab',
                component: 'TabsList',
                config: {
                  id: '1'
                }
              }
            ]
          },
          {
            type: 'tabset',
            id: '#32',
            selected: 2,
            children: [
              {
                type: 'tab',
                id: '#321',
                name: 'New Tab',
                component: 'TabsList'
              },
              {
                type: 'tab',
                id: '#322',
                name: 'New Tab',
                component: 'TabsList'
              },
              {
                type: 'tab',
                id: '#323',
                name: 'Data Browser',
                component: 'DataBrowser'
              }
            ]
          },
          {
            type: 'tabset',
            id: '#33',
            children: [
              {
                type: 'tab',
                id: '#331',
                name: 'New Tab',
                component: 'TabsList'
              }
            ]
          }
        ]
      },
      {
        type: 'tabset',
        id: '#4',
        enableDrop: false,
        enableDrag: false,
        children: [
          {
            type: 'tab',
            id: '#41',
            name: 'New Tab',
            component: 'TabsList',
            config: {
              id: '1'
            }
          }
        ]
      }
    ]
  },
  borders: []
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

  //const layout = useRef<Layout | null> (null);

  const refs = useRef<Layout & Model>(null)
  const model = Model.fromJson(jsonLayoutModel)

  return (
    <AnnotatorPanel.Provider value={panel}>
      <Flex
        width="full"
        height="100%"
        p={2}
        borderRight="4px"
        borderColor="gray.900"
        direction="column"
      >
        <Layout
          model={model}
          ref={refs}
          factory={(node: TabNode) => {
            const component = node.getComponent()

            // Return different component depending on component
            if (component === 'TabsList') {
              const tabId = node.getId()
              return <TabsList layout={refs} nodeId={tabId} />
            }
            if (component === 'Classification') {
              return <Classification />
            }
            if (component === 'Objects') {
              return <Objects />
            }
            if (component === 'Panel') {
              return <Panel />
            }
            if (component === 'Tools') {
              return <Tools />
            }
            if (component === 'Test') {
              return <Test />
            }
            if (component === 'DataBrowser') {
              return <DataBrowser />
            }
          }}
        />
      </Flex>
    </AnnotatorPanel.Provider>
  )
}
