import { ComponentProps } from 'react'
import { AvatarImage, Container } from './styles'

interface AvatarProps extends ComponentProps<typeof Container> {
  src: string
  size?: 'sm' | 'md' | 'lg'
  alt: string
}

export function Avatar({ alt, src, size = 'md', ...props }: AvatarProps) {
  return (
    <Container size={size} {...props}>
      <AvatarImage src={src} alt={alt} width={80} height={80} />
    </Container>
  )
}
