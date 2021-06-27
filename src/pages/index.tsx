import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import {
  Button,
  Image,
  Flex,
  Input,
  Text,
  Heading,
  VStack,
} from '@chakra-ui/react'

import * as C from '~/components'
import { useAuth } from '~/contexts'
import { database } from '~/services/firebase'

export default function Home() {
  const { push } = useRouter()
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('')

  const createRoom = async () => {
    if (!user) {
      await signInWithGoogle()
    }
    push('/rooms/new')
  }

  const joinRoom = async (e: FormEvent) => {
    e.preventDefault()
    if (!roomCode.trim()) return

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      alert('Room does not exists.')
      return
    }

    if (roomRef.val().closeAt) {
      alert('Room already closed.')
      return
    }

    push(`/rooms/${roomCode}`)
  }
  return (
    <Flex w="100vw" h="100vh" align="stretch">
      <C.MetaTags title="Home" />
      <Flex direction="column" p="32" justify="center" flex="6" bg="rocket.700">
        <VStack spacing={8}>
          <Image
            src="/assets/images/illustration.svg"
            alt="Ilustração simbolizando perguntas e respostas"
          />
          <Heading fontSize={36} fontWeight={700} color="gray.50">
            Crie salas de Q&amp;A ao-vivo
          </Heading>
          <Text fontSize={24} color="gray.100">
            Tire as dúvidas da sua audiência em tempo-real
          </Text>
        </VStack>
      </Flex>
      <Flex
        flex="8"
        direction="column"
        align="center"
        justify="center"
        as="form"
        onSubmit={joinRoom}
      >
        <VStack spacing={8} maxW={320}>
          <Image src="/assets/images/logo.svg" alt="Letmeask" />
          <Button
            _hover={{
              bg: 'google.500',
            }}
            onClick={createRoom}
            bg="google.500"
            color="gray.50"
            p={6}
            w="100%"
            leftIcon={
              <Image
                src="/assets/images/google-icon.svg"
                alt="Logo do Google"
              />
            }
          >
            Crie sua sala com o Google
          </Button>
          <Text>ou entre em uma sala</Text>
          <Input
            type="text"
            placeholder="Digite o código da sala"
            value={roomCode}
            onChange={e => setRoomCode(e.target.value)}
          />
          <Button type="submit" p={6} w="100%" colorScheme="blackAlpha">
            Entrar na sala
          </Button>
        </VStack>
      </Flex>
    </Flex>
  )
}
