import { ReactNode } from 'react'

export type QuestionItemProps = {
  data: QuestionProps
  children?: ReactNode
}

export type QuestionProps = {
  content: string
  author: {
    name: string
    avatar: string
  }
  isAnswered?: boolean
  isHighlighted?: boolean
  likes: Record<string, LikesProps>
}

export type LikesProps = {
  authorId: string
}
