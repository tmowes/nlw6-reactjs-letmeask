import React from 'react'

import { Flex, Text } from '@chakra-ui/react'

import { Logo } from './Logo'
import { RoomCode } from './RoomCode'
import { HeaderProps } from './types'

export const Header = (props: HeaderProps) => {
  const { roomCode, children } = props
  return (
    <Flex
      as="header"
      w="100%"
      h="20"
      px={['6', '16']}
      align="center"
      justify="space-between"
      borderBottomWidth={2}
      borderBottomColor="gray.100"
    >
      <Logo />
      <Flex>
        <RoomCode roomCode={roomCode} />
        {children}
      </Flex>
    </Flex>
  )
}
