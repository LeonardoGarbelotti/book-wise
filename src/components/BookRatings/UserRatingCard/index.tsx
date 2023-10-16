/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Link from 'next/link'
import { UserDetails, UserRatingCardContainer } from './styles'
import { Rating, User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { Avatar } from '@/components/ui/Avatar'
import { Heading, Text } from '@/components/typography'
import { getRelativeTimeString } from '@/utils/getRelativeTimeString'
import { RatingStars } from '@/components/RatingStars'

export type RatingWithAuthor = Rating & {
  user: User
}

interface UserRatingCardProps {
  rating: RatingWithAuthor
}

export function UserRatingCard({ rating }: UserRatingCardProps) {
  const { data: session } = useSession()
  const distanceSinceRatingCreation = getRelativeTimeString(
    new Date(rating.created_at),
    'pt-BR',
  )

  const isOwner = session?.user?.id === rating.user_id

  return (
    <UserRatingCardContainer variant={isOwner ? 'highlight' : 'primary'}>
      <UserDetails>
        <section>
          <Link href={`/profile/${rating.user_id}`}>
            <Avatar alt={rating.user.name} src={rating.user.avatar_url!} />
          </Link>
          <div>
            <Heading size="xs">{rating.user.name}</Heading>
            <Text size="sm" color="gray-400">
              {distanceSinceRatingCreation}
            </Text>
          </div>
        </section>
        <RatingStars rating={rating.rate} />
      </UserDetails>
      <Text size="sm" color="gray-300">
        {rating.description}
      </Text>
    </UserRatingCardContainer>
  )
}
