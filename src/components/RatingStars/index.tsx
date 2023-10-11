import { Star } from '@phosphor-icons/react'
import { ComponentProps } from 'react'
import { RatingStarsContainer } from './styles'

interface RatingStarsProps extends ComponentProps<typeof RatingStarsContainer> {
  rating: number
  size?: 'sm' | 'md' | 'lg'
}

export function RatingStars({
  rating,
  size = 'sm',
  ...props
}: RatingStarsProps) {
  return (
    <RatingStarsContainer size={size} {...props}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={`star-${index}`}
          weight={index + 1 <= rating ? 'fill' : 'regular'}
        />
      ))}
    </RatingStarsContainer>
  )
}
