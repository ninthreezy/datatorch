import { BoxProps } from '@chakra-ui/react'
import { Node, Element } from 'slate'

export interface EquationElement extends Element, Omit<BoxProps, 'children'> {
  type: 'equation'
  content: string
  block?: boolean
}

export const isEquation = (n: Node): n is EquationElement =>
  n.type === 'equation'
