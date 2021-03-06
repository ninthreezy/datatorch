import { Text, TextProps, useColorModeValue as mode } from '@chakra-ui/react'

export const TextMuted: React.FC<TextProps> = ({ children, ...props }) => (
  <Text {...props} color={mode('gray.700', 'gray.400')}>
    {children}
  </Text>
)
