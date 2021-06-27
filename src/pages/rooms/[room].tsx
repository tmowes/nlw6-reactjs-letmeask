import { FormEvent, useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import {
  Button,
  Flex,
  IconButton,
  Image,
  Text,
  Heading,
  VStack,
  Textarea,
  Avatar,
  Tag,
} from '@chakra-ui/react'

import * as C from '~/components'
import { useAuth } from '~/contexts'
import { database } from '~/services/firebase'
import { useRoom } from '~/hooks'

type Props = {
  room: string
}

export default function Room(props: Props) {
  const { room = '-MdCU3iQXpn_jAZ2QOCM' } = props
  const { user } = useAuth()
  const [newQuestion, setNewQuestion] = useState('')
  const { roomName, questions, questionsCount } = useRoom({ roomId: room })

  const sendNewQuestion = async (e: FormEvent) => {
    e.preventDefault()
    if (!newQuestion.trim()) return

    if (!user) return

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    }

    await database.ref(`rooms/${room}/questions`).push(question)
    setNewQuestion('')
  }

  const likeQuestion = async (
    questionId: string,
    likeId: string | undefined
  ) => {
    if (likeId) {
      await database
        .ref(`rooms/${room}/questions/${questionId}/likes/${likeId}`)
        .remove()
    } else {
      await database.ref(`rooms/${room}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      })
    }
  }

  return (
    <Flex direction="column" w="100vw" h="100vh" align="stretch">
      <C.MetaTags title="Room" />
      <C.Header roomCode={room} />
      <Flex
        align="center"
        justify="center"
        direction="column"
        mt="8"
        mx="auto"
        w="100%"
        maxW={720}
      >
        <VStack
          w="100%"
          spacing="4"
          align="start"
          as="form"
          onSubmit={sendNewQuestion}
          mb="8"
        >
          <Flex>
            <Heading fontSize={24} fontWeight={700} textAlign="left">
              {`Sala ${roomName}`}
            </Heading>
            {questionsCount > 0 && (
              <Tag ml="4" borderRadius="full" bg="rocket.300" color="gray.100">
                {`${questionsCount} pergunta${questionsCount > 1 ? 's' : ''}`}
              </Tag>
            )}
          </Flex>
          <Textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <Flex w="100%" align="center" justify="space-between">
            {user ? (
              <Flex align="center">
                <Avatar src={user.avatar} name={user.name} size="sm" />
                <Text ml="2">{user.name}</Text>
              </Flex>
            ) : (
              <Text>Para enviar uma pergunta, faça seu login.</Text>
            )}
            <Button colorScheme="blackAlpha" type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </Flex>
        </VStack>
        <VStack w="100%" spacing="4">
          {questions.map(question => (
            <C.Question key={question.id} data={question}>
              {!question.isAnswered && (
                <>
                  {question.likeCount > 0 && (
                    <Text mt="2" mr="-2">
                      {question.likeCount}
                    </Text>
                  )}
                  <IconButton
                    colorScheme="transparent"
                    aria-label="Marcar como gostei"
                    w="12"
                    h="12"
                    borderRadius="12"
                    opacity={question.likeId ? '1' : '0.4'}
                    onClick={() => likeQuestion(question.id, question.likeId)}
                    icon={<Image src="/assets/images/like.svg" w="5" h="5" />}
                  />
                </>
              )}
            </C.Question>
          ))}
        </VStack>
      </Flex>
    </Flex>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { room } = params

  return {
    props: {
      room,
    },
    revalidate: 60 * 30,
  }
}
