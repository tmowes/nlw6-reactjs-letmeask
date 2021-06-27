import React from 'react'

import { Button, Flex, Image, Text } from '@chakra-ui/react'

import { RoomCodeProps } from './types'

export const RoomCode = (props: RoomCodeProps) => {
  const { roomCode } = props

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode)
  }

  return (
    <Button
      align="center"
      justify="space-between"
      borderRadius="8"
      borderWidth={1}
      borderColor="rocket.700"
      overflow="hidden"
      p="0"
      m="0"
      h="10"
      colorScheme="whiteAlpha"
      onClick={copyRoomCode}
    >
      <Flex bg="rocket.700" h="10" px="2">
        <Image src="/assets/images/copy.svg" alt="Copy room code" />
      </Flex>
      <Text flex="1" mx="2" color="text">{`Sala #${roomCode}`}</Text>
    </Button>
  )
}
