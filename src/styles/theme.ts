import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    gray: {
      '900': '#181B23',
      '800': '#1f2029',
      '700': '#353646',
      '600': '#4b4d63',
      '500': '#616480',
      '400': '#797d9a',
      '300': '#9699b0',
      '200': '#a8a8b3',
      '100': '#d1d2dc',
      '50': '#eeeef2',
    },
    rocket: {
      '700': '#835afd',
      '300': '#e559f9',
    },
    google: {
      '500': '#ea4335',
    },
    julius: {
      '600': '#ff7600',
    },
    text: '#29292e',
  },
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Poppins, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'text',
      },
    },
  },
})
