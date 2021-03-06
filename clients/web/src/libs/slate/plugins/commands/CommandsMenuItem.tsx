import React, { memo, useEffect, useRef } from 'react'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { Command } from './utils'

export const CommandsMenuItem: React.FC<
  Command & {
    focusedName: string
    onClick?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void
    onMouseEnter?(): void
    onMouseLeave?(): void
  }
> = memo(
  ({ icon, desc, name, focusedName, onClick, onMouseEnter, onMouseLeave }) => {
    const ref = useRef<HTMLDivElement>()
    useEffect(() => {
      if (ref.current == null) return
      if (focusedName === name)
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, [focusedName, name])
    return (
      <Flex
        ref={ref}
        paddingX={2}
        paddingY={1}
        alignItems="center"
        cursor="pointer"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        bgColor={focusedName === name ? 'gray.600' : null}
      >
        <Box
          border="1px"
          borderColor="gray"
          rounded="sm"
          margin={1}
          padding={1}
        >
          <Icon as={icon} marginRight="3" w={7} h={7} margin="auto" />
        </Box>
        <Box flexGrow={1} marginLeft={2}>
          <Text letterSpacing="wide" fontWeight="semibold">
            {name}
          </Text>
          <Text fontSize="xs" color="gray.300">
            {desc}
          </Text>
        </Box>
      </Flex>
    )
  }
)
