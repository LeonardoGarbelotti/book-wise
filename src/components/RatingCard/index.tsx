/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Link from 'next/link'
import {
  BookContent,
  BookDetails,
  BookImage,
  RatingCardContainer,
  ToggleShowMoreButton,
  UserDetails,
} from './styles'
import { Avatar } from '../ui/Avatar'
import { Book, Rating, User } from '@prisma/client'
import { Heading, Text } from '../typography'
import { getRelativeTimeString } from '@/utils/getRelativeTimeString'
import { RatingStars } from '../RatingStars'
import { useToggleShowMore } from '@/hooks/useToggleShowMore'

export interface RatingWithAuthorAndBook extends Rating {
  user: User
  book: Book
}

interface RatingCardProps {
  rating: RatingWithAuthorAndBook
}

export function RatingCard({ rating }: RatingCardProps) {
  const pastTimeSinceRating = getRelativeTimeString(
    new Date(rating.created_at),
    'pt-BR',
  )

  const MAX_SUMMARY_LENGHT = 180
  const {
    text: bookSummary,
    toggleShowMore,
    isShowingMore,
  } = useToggleShowMore(rating.book.summary, MAX_SUMMARY_LENGHT)

  return (
    <RatingCardContainer>
      <UserDetails>
        <section>
          <Link href={`/profile/${rating.user_id}`}>
            <Avatar src={rating.user.avatar_url!} alt={rating.user.name} />
          </Link>
          <div>
            <Text>{rating.user.name}</Text>
            <Text size="sm" color="gray-400">
              {pastTimeSinceRating}
            </Text>
          </div>
        </section>
        <RatingStars rating={rating.rate} />
      </UserDetails>
      <BookDetails>
        <Link href={`/explore?book=${rating.book_id}`}>
          <BookImage
            src={rating.book.cover_url}
            width={108}
            height={152}
            alt={rating.book.name}
          />
        </Link>
        <BookContent>
          <div>
            <Heading size="xs">{rating.book.name}</Heading>
            <Text size="sm" color="gray-400">
              {rating.book.author}
            </Text>
          </div>
          <Text size="sm" color="gray-300" css={{ marginTop: '$5' }}>
            {bookSummary}
            {rating.book.summary.length > MAX_SUMMARY_LENGHT && (
              <ToggleShowMoreButton onClick={toggleShowMore}>
                {isShowingMore ? 'ver menos' : 'ver mais'}
              </ToggleShowMoreButton>
            )}
          </Text>
        </BookContent>
      </BookDetails>
    </RatingCardContainer>
  )
}
