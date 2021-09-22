import { theme } from '@/theme'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { Canvas, Props } from 'react-three-fiber'

const ThemeProvider: React.FC = ({ children }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
)

export const ForwardContext: React.FC<Props & { ExtraProviders?: React.FC }> =
  ({ ExtraProviders, children, ...props }) => {
    return (
      <Canvas {...props}>
        <ThemeProvider>
          {ExtraProviders != null ? (
            <ExtraProviders>{children}</ExtraProviders>
          ) : (
            children
          )}
        </ThemeProvider>
      </Canvas>
    )
  }
