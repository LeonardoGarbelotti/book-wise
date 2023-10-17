import { useSession } from 'next-auth/react'
import {
  ActionsContainer,
  FormContainer,
  RatingFormContainer,
  UserDetails,
} from './styles'
import { Avatar } from '@/components/ui/Avatar'
import { Heading } from '@/components/typography'
import { RatingStars } from '@/components/RatingStars'
import { FormEvent, useState } from 'react'
import { TextArea } from '@/components/ui/TextArea'
import { ActionIcon } from '@/components/ui/ActionIcon'
import { Check, X } from '@phosphor-icons/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'

interface RatingFormProps {
  onCancel: () => void
  bookId: string
}

export function RatingForm({ bookId, onCancel }: RatingFormProps) {
  const { data: session } = useSession()
  const [userSelectedRate, setUserSelectedRate] = useState(0)
  const [userRatingText, setUserRatingText] = useState('')

  const user = session?.user
  const isSubmitButtonDisabled = !userRatingText.trim() || !userSelectedRate

  const queryClient = useQueryClient()

  const { mutateAsync: handleRate } = useMutation(
    async () => {
      await api.post(`/books/${bookId}/rate`, {
        userRatingText,
        rate: userSelectedRate,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['book', bookId])
        queryClient.invalidateQueries(['books'])
        onCancel()
      },
    },
  )

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (isSubmitButtonDisabled) return
    await handleRate()
  }

  return (
    <RatingFormContainer>
      {user && (
        <UserDetails>
          <section>
            <Avatar alt={user.name} src={user.avatar_url} />
            <Heading size="xs">{user.name}</Heading>
          </section>
          <RatingStars
            size="lg"
            rating={userSelectedRate}
            setRating={setUserSelectedRate}
          />
        </UserDetails>
      )}
      <FormContainer onSubmit={handleSubmit}>
        <TextArea
          placeholder="Descreva sua avaliação..."
          maxLength={450}
          value={userRatingText}
          onChange={({ target }) => setUserRatingText(target.value)}
        />
        <ActionsContainer>
          <ActionIcon
            type="button"
            icon={<X />}
            iconColor="purple100"
            onClick={onCancel}
          />
          <ActionIcon
            type="submit"
            icon={<Check />}
            iconColor="green100"
            disabled={isSubmitButtonDisabled}
          />
        </ActionsContainer>
      </FormContainer>
    </RatingFormContainer>
  )
}
