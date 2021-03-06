import {
  Box,
  Icon,
  IconButton,
  IconButtonProps,
  Tooltip
} from '@chakra-ui/react'
import React, { memo } from 'react'
import { IconType } from 'react-icons/lib'

export const ToolbarButton: React.FC<{
  icon: IconType
  name?: string
  shortcut?: string
  isActive?: boolean
  onMouseDown?: IconButtonProps['onMouseDown']
}> = memo(({ icon, name, shortcut, onMouseDown, isActive }) => {
  const button = (
    <IconButton
      isActive={isActive}
      onMouseDown={onMouseDown}
      icon={<Icon as={icon} />}
      aria-label="bold"
      size="sm"
      variant="ghost"
    />
  )
  return name ? (
    <Tooltip
      label={
        <Box>
          {name}
          <Box fontSize="xs" color="gray">
            {shortcut}
          </Box>
        </Box>
      }
      fontSize="sm"
      placement="top"
    >
      {button}
    </Tooltip>
  ) : (
    button
  )
})
