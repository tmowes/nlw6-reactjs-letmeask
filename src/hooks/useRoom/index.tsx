import {
  createContext,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from 'react'

import { useAuth } from '~/contexts'

import { database } from '../../services/firebase'
import { DatabaseQuestions, ParsedQuestion, UseRoomProps } from './types'

export const useRoom = ({ roomId }: UseRoomProps) => {
  const { user } = useAuth()
  const [roomName, setRoomName] = useState('')
  const [questions, setQuestions] = useState<ParsedQuestion[]>([])

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)
    roomRef.on('value', roomData => {
      const roomTitle = roomData.val().title
      const roomQuestions = roomData.val().questions as DatabaseQuestions

      const parsedQuestions = Object.entries(roomQuestions).map(
        ([key, value]) => ({
          likeCount: Object.values(value.likes ?? {}).length,
          // hasLiked: Object.values(value.likes ?? {}).some(
          //   like => like.authorId === user?.id
          // ),
          likeId: Object.entries(value.likes ?? {}).find(
            ([, like]) => like.authorId === user?.id
          )?.[0],
          ...value,
          id: key,
        })
      )
      setRoomName(roomTitle)
      setQuestions(parsedQuestions)
    })
    return () => {
      roomRef.off('value')
    }
  }, [roomId, user?.id])

  const questionsCount = questions.length

  return {
    questions,
    questionsCount,
    roomName,
  }
}
