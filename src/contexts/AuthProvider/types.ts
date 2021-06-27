import { ReactNode } from 'react'

export type AuthContextData = {
  user: User
  signInWithGoogle: () => Promise<void>
}

export type AuthProviderProps = {
  children: ReactNode
}

export type User = {
  id: string
  name: string
  avatar: string
}
