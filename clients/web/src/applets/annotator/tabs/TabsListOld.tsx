import React, { memo, RefObject, useState } from 'react'
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import { GoldenLayout } from 'golden-layout'
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
  { title: 'Test', componentType: 'Test', description: 'Panel for debugging.' },
  {
    title: 'Tab List',
    componentType: 'TabsList',
    description: 'Add other tabs to your layout.'
  },
  {
    title: 'Visualizer',
    componentType: 'Visualizer',
    description: 'Interactive tab for creating and displaying annotation.'
  },
  {
    title: 'Classification',
    componentType: 'Classification',
    description: 'Add labels to files for classification.'
  }
]
const searchOptions: UseMatchSorterOptions<TabDragConfig> = {
  keys: ['title', 'componentType', 'description']
}

export const TabsListItem = memo<
  TabDragConfig & { layout: RefObject<GoldenLayout> }
>(({ title, componentType, description, layout }) => {
  const onClick = () => {
    layout.current?.newItem({ type: 'component', title, componentType })
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
      <Text fontSize="md">{title}</Text>

      <Text fontSize="sm" color="gray" textAlign="left" marginTop="0.5">
        {description}
      </Text>
    </Button>
  )
})

export const TabsList: React.FC<{ layout: RefObject<GoldenLayout> }> = ({
  layout
}) => {
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
          <TabsListItem {...config} layout={layout} key={config.title} />
        ))}
      </Box>
    </Flex>
  )
}
