import { FormEvent, useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import {
  Button,
  Flex,
  Text,
  Heading,
  Image,
  VStack,
  Textarea,
  Avatar,
  Tag,
  IconButton,
} from '@chakra-ui/react'

import * as C from '~/components'
import { useAuth } from '~/contexts'
import { database } from '~/services/firebase'
import { useRoom } from '~/hooks'

type Props = {
  room: string
}

export default function AdminRoom(props: Props) {
  const { room = '-MdCU3iQXpn_jAZ2QOCM' } = props
  const { user } = useAuth()
  const { push } = useRouter()
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

  const answeredQuestion = async (questionId: string) => {
    await database.ref(`rooms/${room}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }

  const highlightQuestion = async (questionId: string) => {
    await database.ref(`rooms/${room}/questions/${questionId}`).update({
      isHighlighted: true,
    })
  }

  const deleteQuestion = async (questionId: string) => {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${room}/questions/${questionId}`).remove()
    }
  }

  const endRoom = async () => {
    await database.ref(`rooms/${room}`).update({
      closeAt: new Date(),
    })
    push('/')
  }

  return (
    <Flex direction="column" w="100vw" h="100vh" align="stretch">
      <C.MetaTags title="Room" />
      <C.Header roomCode={room}>
        <Button ml="2" onClick={endRoom}>
          Encerrar a sala
        </Button>
      </C.Header>
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
        </VStack>
        <VStack w="100%" spacing="4">
          {questions.map(question => (
            <C.Question key={question.id} data={question}>
              {!question.isAnswered && (
                <>
                  <IconButton
                    colorScheme="transparent"
                    aria-label="Marcar pergunta como respondida"
                    w="12"
                    h="12"
                    borderRadius="12"
                    opacity={question.isAnswered ? '1' : '0.4'}
                    onClick={() => answeredQuestion(question.id)}
                    icon={<Image src="/assets/images/check.svg" w="5" h="5" />}
                  />
                  <IconButton
                    colorScheme="transparent"
                    aria-label="Dar destaque à pergunta"
                    w="12"
                    h="12"
                    borderRadius="12"
                    opacity={question.isHighlighted ? '1' : '0.4'}
                    onClick={() => highlightQuestion(question.id)}
                    icon={<Image src="/assets/images/answer.svg" w="5" h="5" />}
                  />
                </>
              )}

              <IconButton
                colorScheme="transparent"
                aria-label="Remover pergunta"
                w="12"
                h="12"
                borderRadius="12"
                opacity={question.likeId ? '1' : '0.4'}
                onClick={() => deleteQuestion(question.id)}
                icon={<Image src="/assets/images/delete.svg" w="5" h="5" />}
              />
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
