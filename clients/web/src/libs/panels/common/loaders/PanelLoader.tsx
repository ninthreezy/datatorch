import { definePanel } from '../../core'
import React from 'react'
import * as rt from 'runtypes'
import { Text, Center, Spinner, CircularProgress } from '@chakra-ui/react'

export const Loading: React.FC<{ message?: string; progress?: number }> = ({
  message,
  progress
}) => (
  <Center h="full" w="full">
    {progress == null ? (
      <Spinner size="xl" />
    ) : (
      <CircularProgress value={progress} />
    )}
    <Text fontSize="xl" marginLeft="4">
      {message}
    </Text>
  </Center>
)

export const PanelLoader = definePanel({
  displayName: 'Loading',
  relevance: 0,
  context: rt.Record({
    loading: rt.Literal(true),
    loadingMessage: rt.Undefined.Or(rt.String)
  }),
  Component: ({ context }) => {
    return <Loading message={context.loadingMessage} />
  }
})
