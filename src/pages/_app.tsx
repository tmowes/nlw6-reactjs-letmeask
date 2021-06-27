import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'

import '../services/firebase'

import { AppProvider } from '../contexts'
import { theme } from '../styles/theme'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ChakraProvider>
  )
}
