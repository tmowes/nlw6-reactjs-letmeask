type CustomEnvVar =
  | 'NEXT_PUBLIC_API_KEY'
  | 'NEXT_PUBLIC_AUTH_DOMAIN'
  | 'NEXT_PUBLIC_DATABASE_URL'
  | 'NEXT_PUBLIC_PROJECT_ID'
  | 'NEXT_PUBLIC_STORAGE_BUCKET'
  | 'NEXT_PUBLIC_MESSAGING_SENDER_ID'
  | 'NEXT_PUBLIC_APP_ID'

type ProcessEnvExtended = {
  [key in CustomEnvVar]: string
}

declare namespace NodeJS {
  export interface ProcessEnv extends ProcessEnvExtended {}
}