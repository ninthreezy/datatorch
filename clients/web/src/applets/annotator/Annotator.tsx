import React from 'react'

import {
  AnnotatorConfig,
  AnnotatorContext,
  AnnotatorPanel
} from './AnnotatorContext'

import * as panels from './panels'
import { usePanels } from '@/libs/panels/'
import { Box, Flex } from '@chakra-ui/react'
import { Classification } from './tabs/Classification'
import { Objects } from './tabs/Objects'
import { Tools } from './tabs/Tools'
import { Panel } from './tabs/Panel'
import { DataBrowser } from './tabs/DataBrowser'
import { Ontology } from './tabs/Ontology'
import { Examples } from './tabs/Examples'
import { Tab } from './tabs/Tab'

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

  return (
    <AnnotatorPanel.Provider value={panel}>
      <Flex height="full">
        {/* Col 1 */}
        <Flex
          width={375}
          px={2}
          height="full"
          borderRight="4px"
          borderColor="gray.900"
          direction="column"
          overflow="scroll"
        >
          <Tab name={'Raw Tab Component'} />
          <DataBrowser />
          <Tab name={'Classification'} />
          <Tab name={'Ontology'} />
          <Tab name={'Tool'} />
          <Tab name={'Reviewer'} />
          <Tab name={'Jobs'} />
          <Tab name={'Discussion'} />
          <Tab name={'Info'} />
          <Tab name={'Settings'} />
        </Flex>
        {/* Col 2 */}
        <Box borderRight="4px" borderColor="gray.900" p={1}>
          <Tools />
        </Box>
        {/* Col 3 */}
        <Box flexGrow={1}>
          <Panel />
        </Box>
      </Flex>
    </AnnotatorPanel.Provider>
  )
}
