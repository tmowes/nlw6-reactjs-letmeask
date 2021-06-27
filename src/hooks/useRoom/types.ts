import { QuestionProps } from '~/components/Question/types'

export type DatabaseQuestions = Record<string, QuestionProps>

export type ParsedQuestion = QuestionProps & {
  id: string
  likeCount: number
  // hasLiked: boolean
  likeId: string | undefined
}
export type UseRoomProps = {
  roomId: string
}
