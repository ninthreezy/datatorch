import React, { memo, RefObject, useState } from 'react'
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import { Layout, Model, TabNode, IJsonModel, Actions } from 'flexlayout-react'
import {
  useMatchSorter,
  UseMatchSorterOptions
} from '../../../libs/hooks/useMatchSorter'

interface TabDragConfig {
  title?: string
  componentType: string
  description?: string
}

const allTabs: Array<TabDragConfig> = [
  // { title: 'Test', componentType: 'Test', description: 'Panel for debugging.' },
  {
    title: 'New Tab',
    componentType: 'TabsList',
    description: 'Create new tabs.'
  },
  {
    title: 'Data Browser',
    componentType: 'DataBrowser',
    description: 'Quickly access files within datasets.'
  },
  {
    title: 'Visualizer',
    componentType: 'Visualizer',
    description: 'Visualize and annotate data.'
  },
  {
    title: 'Classification',
    componentType: 'Classification',
    description: 'Create metadata to classify individual files.'
  },
  {
    title: 'Ontology',
    componentType: 'Test',
    description: 'View and create labels for data annotation.'
  },
  {
    title: 'Examples',
    componentType: 'Test',
    description: 'Share ideal examples of label classes for annotation work.'
  },
  {
    title: 'Tool',
    componentType: 'Test',
    description: 'Fine tune settings for your selected tool.'
  },
  {
    title: 'Reviewer',
    componentType: 'Test',
    description: 'Approve or deny files and annotations.'
  },
  {
    title: 'Jobs',
    componentType: 'Test',
    description: 'See assigned tasks and job progress.'
  },
  {
    title: 'Discussion',
    componentType: 'Test',
    description: 'Messaging to discuss files and annotations.'
  },
  {
    title: 'Info',
    componentType: 'Test',
    description: 'View info about the selected file.'
  },
  {
    title: 'Settings',
    componentType: 'Test',
    description: 'View info about the selected file.'
  }
]
const searchOptions: UseMatchSorterOptions<TabDragConfig> = {
  keys: ['title', 'componentType', 'description']
}

export const TabsListItem = memo<
  TabDragConfig & { layout: RefObject<Layout & Model>; nodeId: string }
>(({ title, componentType, description, layout, nodeId }) => {
  const onClick = () => {
    layout.current?.addTabToActiveTabSet({
      type: 'tab',
      name: componentType,
      component: componentType
    })
    //This is if you want to go from master tab to one that transforms
    //layout.current?.doAction(Actions.deleteTab(nodeId))
  }

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      isFullWidth
      flexDirection="column"
      alignItems="flex-start"
      padding="2"
      height="auto"
      style={{
        whiteSpace: 'normal',
        wordWrap: 'break-word'
      }}
    >
      <Text fontSize="sm">{title}</Text>

      <Text
        fontSize="12px"
        color="gray"
        textAlign="left"
        marginTop="0.5"
        fontWeight="100"
      >
        {description}
      </Text>
    </Button>
  )
})

export const TabsList: React.FC<{
  layout: RefObject<Layout & Model>
  nodeId: string
}> = ({ layout, nodeId }) => {
  const [search, setSearch] = useState('')
  const matchList = useMatchSorter(allTabs, search, searchOptions)
  return (
    <Flex h="full" margin="2" flexDirection="column">
      <Input
        variant="filled"
        placeholder="Search"
        size="sm"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Text fontSize="xs" color="gray" margin="1">
        Click the tab you would like to add to your layout.
      </Text>
      <Box
        padding="1"
        overflow="auto"
        flex="1"
        borderTop="1px"
        borderTopColor="gray.700"
      >
        {matchList.map(config => (
          <TabsListItem
            {...config}
            layout={layout}
            nodeId={nodeId}
            key={config.title}
          />
        ))}
      </Box>
    </Flex>
  )
}
