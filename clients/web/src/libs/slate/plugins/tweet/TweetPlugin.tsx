import { Box, Icon } from '@chakra-ui/react'
import React from 'react'
import { FaTwitter } from 'react-icons/fa'
import { Tweet } from 'react-twitter-widgets'
import { Node, Element } from 'slate'
import { SlatePlugin } from '../../core'
import { EmptyElement } from '../utils/EmptyBlock'

export interface TweetElement extends Element {
  type: 'tweet'
  url: string
}

const isTweet = (n: Node): n is TweetElement => n.type === 'tweet'

export const TweetPlugin = (): SlatePlugin => {
  return {
    id: 'tweet',
    editor: editor => {
      const { isVoid } = editor
      editor.isVoid = el => (isTweet(el) ? true : isVoid(el))
      return editor
    },
    renderElement: ({ attributes, element, children }) => {
      if (!isTweet(element)) return null
      const { url } = element
      if (url == null || url === '')
        return (
          <EmptyElement
            {...attributes}
            icon={<Icon w={5} h={5} as={FaTwitter} />}
          >
            Embed a Tweet.
            {children}
          </EmptyElement>
        )

      const tweetId = '1363232875232063493'
      return (
        <Box {...attributes} contentEditable={false}>
          <Tweet
            data-theme="dark"
            tweetId={tweetId}
            options={{ align: 'center', width: '350' }}
          />
          {children}
        </Box>
      )
    }
  }
}
