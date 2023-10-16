import { Book } from '@prisma/client'
import {
  BookCardContainer,
  BookDetails,
  BookImage,
  BookName,
  ReadBadge,
} from './styles'
import { Text } from '@/components/typography'
import { RatingStars } from '@/components/RatingStars'
import { RatingsDialog } from '@/components/RatingsDialog'

export type BookWithAvgRating = Book & {
  avgRating: number
  alreadyRead: boolean
}

interface BookCardProps {
  book: BookWithAvgRating
  size?: 'md' | 'lg'
}

export function BookCard({ book, size = 'md' }: BookCardProps) {
  const IMAGE_SIZES = {
    md: {
      width: 64,
      height: 94,
    },
    lg: {
      width: 108,
      height: 152,
    },
  }

  return (
    <RatingsDialog>
      <BookCardContainer>
        {book?.alreadyRead && <ReadBadge>LIDO</ReadBadge>}
        <BookImage
          width={IMAGE_SIZES[size].width}
          height={IMAGE_SIZES[size].height}
          css={{ minWidth: IMAGE_SIZES[size].width }}
          alt={book.name}
          src={book.cover_url}
        />
        <BookDetails>
          <div>
            <BookName size="xs">{book.name}</BookName>
            <Text size="sm" color="gray-400">
              {book.author}
            </Text>
          </div>
          <RatingStars rating={book.avgRating} />
        </BookDetails>
      </BookCardContainer>
    </RatingsDialog>
  )
}
