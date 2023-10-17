import { useState } from 'react'
import { Text } from '../typography'
import { ActionLink } from '../ui/ActionLink'
import { RatingWithAuthor, UserRatingCard } from './UserRatingCard'
import { BookRatingsContainer } from './styles'
import { RatingForm } from './RatingForm'

interface BookRatingsProps {
  ratings: RatingWithAuthor[]
  bookId: string
}

export function BookRatings({ ratings, bookId }: BookRatingsProps) {
  const [showForm, setShowForm] = useState(false)

  const sortedRatingsByDate = ratings.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  function handleRate() {
    setShowForm(true)
  }

  return (
    <BookRatingsContainer>
      <header>
        <Text>Avaliações</Text>
        <ActionLink withoutIcon text="Avaliar" onClick={handleRate} />
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
