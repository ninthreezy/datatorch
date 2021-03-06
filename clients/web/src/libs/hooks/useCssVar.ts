import { useColorMode } from '@chakra-ui/react'
import { getColor } from '@chakra-ui/theme-tools'
import { useTheme } from '@emotion/react'
import { useMount } from 'react-use'

const setCssVar = (variable: string, value: string) => {
  document.documentElement.style.setProperty(`--${variable}`, value)
}

/**
 * Sets global css variables using the object key to the chakra color.
 *
 * @example
 * ```ts
 * useCssVars({
 *   'color-depending-on-mode': ['gray.900', 'gray.100'],
 *   'same-color': 'gray.200'
 * })
 * ```
 */
export const useCssVars = (
  values: Record<string, [string, string] | string>
) => {
  const theme = useTheme()
  const { colorMode } = useColorMode()

  useMount(() => {
    for (const [variable, colors] of Object.entries(values)) {
      const color =
        typeof colors === 'string'
          ? colors
          : colors[colorMode === 'light' ? 0 : 1]
      setCssVar(variable, getColor(theme, color))
    }
  })
}
