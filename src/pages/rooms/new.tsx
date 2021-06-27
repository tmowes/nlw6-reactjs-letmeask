import { FormEvent, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import {
  Button,
  Image,
  Flex,
  Input,
  Text,
  Heading,
  VStack,
  Link,
} from '@chakra-ui/react'

import * as C from '~/components'
import { useAuth } from '~/contexts'
import { database } from '~/services/firebase'

export default function NewRoom() {
  const { user } = useAuth()
  const { push } = useRouter()
  const [roomName, setRoomName] = useState('')

  const createNewRoom = async (e: FormEvent) => {
    e.preventDefault()
    if (!roomName.trim()) return

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: roomName,
      authorId: user?.id,
    })

    push(`/rooms/${firebaseRoom.key}`)
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
          <Heading fontSize={36} fontWeight={700} color="gray.50" w="100%">
            Crie salas de Q&amp;A ao-vivo
          </Heading>
          <Text fontSize={24} color="gray.100">
            Tire as dúvidas da sua audiência em tempo-real
          </Text>
        </VStack>
      </Flex>
      <Flex flex="8" direction="column" align="center" justify="center">
        <VStack spacing={8} maxW={320} as="form" onSubmit={createNewRoom}>
          <Image src="/assets/images/logo.svg" alt="Letmeask" />
          <Heading fontSize={24} fontWeight={700}>
            {user?.name}
          </Heading>
          <Heading fontSize={24} fontWeight={700}>
            Crie uma nova sala
          </Heading>
          <Input
            type="text"
            placeholder="Digite o nome da sala"
            value={roomName}
            onChange={e => setRoomName(e.target.value)}
          />
          <Button type="submit" p={6} w="100%" colorScheme="blackAlpha">
            Criar nova sala
          </Button>
          <Text fontSize={13} color="gray.400">
            Quer entrar em uma sala existente?
            <NextLink href="/" passHref>
              <Link
                fontSize={13}
                color="rocket.300"
                cursor="pointer"
                _hover={{
                  color: 'rocket.700',
                }}
              >
                {` clique aqui`}
              </Link>
            </NextLink>
          </Text>
        </VStack>
      </Flex>
    </Flex>
  )
}
