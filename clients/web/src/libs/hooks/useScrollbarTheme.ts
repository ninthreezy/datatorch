import { useTheme, useColorModeValue as mode } from '@chakra-ui/react'
import { getColor } from '@chakra-ui/theme-tools'
import { useMemo } from 'react'

export interface ScrollbarOptions {
  scrollbarWidth?: 'thin'
  borderTopRightRadius?: string
  borderTopLeftRadius?: string
  borderBottomRightRadius?: string
  borderRadius?: string
}

export const useScrollBarTheme = ({
  scrollbarWidth,
  borderRadius = '24px',
  borderTopRightRadius,
  borderTopLeftRadius,
  borderBottomRightRadius
}: ScrollbarOptions = {}): any => {
  const theme = useTheme()
  const scrollTrackColor = getColor(theme, mode('gray.300', 'gray.800'))
  const scrollThumbColor = getColor(theme, mode('gray.200', 'gray.600'))

  return useMemo(
    () => ({
      scrollbarWidth: 'thin',
      scrollbarColor: `${scrollThumbColor} ${scrollTrackColor}`,
      '&::-webkit-scrollbar': {
        width: scrollbarWidth === 'thin' ? '5px' : '8px',
        marginLeft: '1px'
      },
      '&::-webkit-scrollbar-track': {
        background: scrollTrackColor
      },
      '&::-webkit-scrollbar-thumb': {
        background: scrollThumbColor,
        borderRadius,
        borderTopRightRadius,
        borderTopLeftRadius,
        borderBottomRightRadius
      }
    }),
    [
      borderBottomRightRadius,
      borderRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      scrollThumbColor,
      scrollTrackColor,
      scrollbarWidth
    ]
  )
}
