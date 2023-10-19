import { Fragment, useState } from 'react'
import { Text } from '../typography'
import { ActionLink } from '../ui/ActionLink'
import { RatingWithAuthor, UserRatingCard } from './UserRatingCard'
import { BookRatingsContainer } from './styles'
import { RatingForm } from './RatingForm'
import { useSession } from 'next-auth/react'
import { LoginDialog } from '../LoginDialog'

interface BookRatingsProps {
  ratings: RatingWithAuthor[]
  bookId: string
}

export function BookRatings({ ratings, bookId }: BookRatingsProps) {
  const { status, data: session } = useSession()
  const [showForm, setShowForm] = useState(false)

  const isUserAuthenticated = status === 'authenticated'

  const sortedRatingsByDate = ratings.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  const userCanRate = ratings.every(
    (rate) => rate.user_id !== session?.user?.id,
  )

  function handleRate() {
    if (!isUserAuthenticated) return
    setShowForm(true)
  }

  const RatingWrapper = isUserAuthenticated ? Fragment : LoginDialog

  return (
    <BookRatingsContainer>
      <header>
        <Text>Avaliações</Text>
        {userCanRate && (
          <RatingWrapper>
            <ActionLink withoutIcon text="Avaliar" onClick={handleRate} />
          </RatingWrapper>
        )}
      </header>
      <section>
        {showForm && (
          <RatingForm bookId={bookId} onCancel={() => setShowForm(false)} />
        )}
        {sortedRatingsByDate.map((rating) => (
          <UserRatingCard key={rating.id} rating={rating} />
        ))}
      </section>
    </BookRatingsContainer>
  )
}
