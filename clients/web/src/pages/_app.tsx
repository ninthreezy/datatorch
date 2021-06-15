import { NextPage } from 'next'
import { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '@/theme'
import { useApollo } from '@/libs/apollo'
import { ApolloProvider } from '@apollo/client'

// import '@/applets/annotator/layout/golden-layout.scss'

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState)
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default App
