import { Star } from '@phosphor-icons/react'
import { ComponentProps, useState } from 'react'
import { RatingStarsContainer } from './styles'

interface RatingStarsProps extends ComponentProps<typeof RatingStarsContainer> {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  setRating?: (rating: number) => void
}

export function RatingStars({
  rating,
  size = 'sm',
  setRating,
  ...props
}: RatingStarsProps) {
  const [previewValue, setPreviewValue] = useState(0)
  const isEditable = !!setRating

  const ratingValue = isEditable ? previewValue : rating

  function handleMouseEnter(value: number) {
    if (isEditable) setPreviewValue(value)
  }

  function handleMouseLeave() {
    if (isEditable) setPreviewValue(rating)
  }

  function handleSetValue() {
    if (isEditable) setRating(previewValue)
  }

  return (
    <RatingStarsContainer
      size={size}
      {...props}
      css={isEditable ? { cursor: 'pointer' } : undefined}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={`star-${index}`}
          weight={index + 1 <= ratingValue ? 'fill' : 'regular'}
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={handleSetValue}
        />
      ))}
    </RatingStarsContainer>
  )
}
