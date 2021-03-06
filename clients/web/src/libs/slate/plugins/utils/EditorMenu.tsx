import { useScrollBarTheme } from '@/libs/hooks/useScrollbarTheme'
import { BoxProps, chakra, useColorModeValue as mode } from '@chakra-ui/react'
import { motion, Variants } from 'framer-motion'
import React, { forwardRef } from 'react'

const Motion = chakra(motion.div)
const motionVariants: Variants = {
  enter: {
    visibility: 'visible',
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    transitionEnd: {
      visibility: 'hidden'
    },
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.1,
      easings: 'easeOut'
    }
  }
}

export const useEditorScrollStyle = () => {
  return useScrollBarTheme({ scrollbarWidth: 'thin' })
}

export const EditorMenu = forwardRef<
  HTMLDivElement,
  BoxProps & { isOpen: boolean }
>((props, ref) => {
  const { isOpen, children, ...rest } = props
  const scrollStyle = useEditorScrollStyle()
  return (
    <Motion
      ref={ref}
      zIndex={10}
      position="absolute"
      initial={false}
      variants={motionVariants}
      animate={isOpen ? 'enter' : 'exit'}
      bgColor={mode('gray.300', 'gray.700')}
      rounded="md"
      shadow="dark-lg"
      css={scrollStyle}
      {...(rest as any)}
    >
      {children}
    </Motion>
  )
})
