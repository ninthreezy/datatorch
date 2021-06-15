import React from 'react'
import {
  Button,
  Code,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger
} from '@chakra-ui/react'
import { Runtype } from 'runtypes'
import { DeepPartial } from './utils'
import { FaBug } from 'react-icons/fa'

export type UpdateFunction<T> = (newValues: DeepPartial<T>) => void
export type RelevanceFunction<Context> = (context: Context) => number
export type AvailableFunction<Context = any> = (context: Context) => boolean

export interface PanelProps<Context, Config> {
  context: Context
  updateContext: UpdateFunction<Context>
  config: Config
  updateConfig: UpdateFunction<Config>
}

export interface PanelOptions<Context, Config> {
  displayName?: string
  context: Runtype<Context>
  config?: Runtype<Config>
  available?: AvailableFunction<Context>
  relevance?: number | RelevanceFunction<Context>
  ConfigComponent?: React.ComponentType<PanelProps<Context, Config>>
  Component: React.ComponentType<PanelProps<Context, Config>>
}

export type Panel<Context, Config> = PanelOptions<Context, Config>

export function definePanel<Context, Config = any>(
  options: PanelOptions<Context, Config>
): Panel<Context, Config> {
  const Component: React.FC<PanelProps<Context, Config>> = props => {
    const Panel = options.Component
    const { context, config } = props
    return (
      <>
        <Popover isLazy>
          <PopoverTrigger>
            <Button
              leftIcon={<Icon as={FaBug} />}
              position="absolute"
              right="0"
              size="xs"
              zIndex="9999"
              m={1}
              bgColor="blackAlpha.500"
            >
              Debug
            </Button>
          </PopoverTrigger>
          <PopoverContent marginRight="1">
            <PopoverBody fontSize="sm" overflow="auto">
              <div>
                <b>Panel: </b> {options.displayName}
              </div>
              <div>
                <b>Context:</b> <br />
                <Code minWidth="full">
                  <pre>{JSON.stringify(context, null, 2)}</pre>
                </Code>
              </div>
              <div>
                <b>Config:</b> <br />
                <Code minWidth="full">
                  <pre>{JSON.stringify(config, null, 2)}</pre>
                </Code>
              </div>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Panel {...props} />
      </>
    )
  }
  return { ...options, Component }
}
