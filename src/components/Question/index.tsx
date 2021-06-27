import { Avatar, Flex, Text } from '@chakra-ui/react'

import { QuestionItemProps } from './types'

export const Question = (props: QuestionItemProps) => {
  const { data, children } = props
  const { content, author, isAnswered, isHighlighted } = data

  const highlighted = isHighlighted && !isAnswered

  return (
    <Flex
      w="100%"
      bg={isAnswered ? 'gray.100' : 'white'}
      p="4"
      direction="column"
      borderRadius="8"
      opacity={!isAnswered ? '1' : '0.5'}
      borderWidth={highlighted ? 2 : 0}
      borderColor="rocket.700"
    >
      <Text mb="2" noOfLines={3} textOverflow="ellipsis">
        {content}
      </Text>
      <Flex w="100%" align="center" justify="space-between">
        <Flex align="center">
          <Avatar src={author.avatar} name={author.name} size="sm" />
          <Text ml="2">{author.name}</Text>
        </Flex>
        <Flex align="center">{children}</Flex>
      </Flex>
    </Flex>
  )
}
