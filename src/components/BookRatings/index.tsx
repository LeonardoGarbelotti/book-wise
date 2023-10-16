import { Text } from '../typography'
import { ActionLink } from '../ui/ActionLink'
import { UserRatingCard } from './UserRatingCard'
import { BookRatingsContainer } from './styles'

export function BookRatings() {
  function handleRate() {
    alert('alow')
  }

  return (
    <BookRatingsContainer>
      <header>
        <Text>Avaliações</Text>
        <ActionLink withoutIcon text="Avaliar" onClick={handleRate} />
      </header>
      <section>
        {Array.from({ length: 6 }).map((_, index) => (
          <UserRatingCard
            key={index}
            rating={{
              rate: 3,
              user: {
                name: 'Leonardo',
                avatar_url: 'https://github.com/LeonardoGarbelotti.png',
              },
              created_at: new Date(),
              description: 'asldjhaskdjhaskld haskljdhakl sjhdklajshd kasjhd',
            }}
          />
        ))}
      </section>
    </BookRatingsContainer>
  )
}
