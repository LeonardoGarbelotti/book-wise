import { PageTitle } from '@/components/ui/PageTitle'
import { MagnifyingGlass, User } from '@phosphor-icons/react'
import { Rating, Book, CategoriesOnBooks, Category } from '@prisma/client'
import { RatingsList, ProfileRatingsContainer } from './styles'
import { ActionLink } from '@/components/ui/ActionLink'
import { Input } from '@/pages/explore/components/Input'
import { useMemo, useState } from 'react'
import { ProfileRatingCard } from './ProfileRatingCard'
import { Text } from '@/components/typography'

type BookCategory = {
  category: Category
}

export type ProfileRatingData = Rating & {
  book: Book & {
    categories: CategoriesOnBooks & BookCategory[]
  }
}

interface ProfileRatingProps {
  ratings: ProfileRatingData[]
  isOwnProfile?: boolean
}

export function ProfileRatings({ ratings, isOwnProfile }: ProfileRatingProps) {
  const [search, setSearch] = useState('')

  const filteredRatings = useMemo(() => {
    return ratings.filter((rating) => {
      return rating.book.name.toLowerCase().includes(search.toLowerCase())
    })
  }, [ratings, search])

  return (
    <ProfileRatingsContainer>
      {isOwnProfile ? (
        <PageTitle pageTitle="Perfil" icon={<User size={25} />} />
      ) : (
        <ActionLink
          href="/"
          text="Voltar"
          iconSide={'left'}
          color={'white'}
          css={{ alignSelf: 'flex-start' }}
        />
      )}
      <Input
        placeholder="Buscar livro avaliado..."
        icon={<MagnifyingGlass size={20} />}
        css={{ marginTop: 40, marginBottom: 32 }}
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />
      <RatingsList>
        {filteredRatings.map((rating) => (
          <ProfileRatingCard key={rating.id} rating={rating} />
        ))}
        {filteredRatings.length <= 0 && (
          <>
            <Text color="gray-400" css={{ textAlign: 'center' }}>
              {search
                ? 'Nenhum resultado encontrado'
                : 'Nenhuma avaliação encontrada'}
            </Text>
          </>
        )}
      </RatingsList>
    </ProfileRatingsContainer>
  )
}
