/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ComponentProps } from '@stitches/react'
import { ActionLinkContainer } from './styles'
import { CaretRight, CaretLeft } from '@phosphor-icons/react'

interface ActionLinkProps
  extends Omit<ComponentProps<typeof ActionLinkContainer>, 'href'> {
  text: string
  href?: string
  onClick?: () => void
  withoutIcon?: boolean
}

export function ActionLink({
  text,
  href,
  onClick,
  withoutIcon,
  iconSide = 'right',
  ...props
}: ActionLinkProps) {
  return (
    <ActionLinkContainer
      {...props}
      href={href!}
      iconSide={iconSide}
      onClick={onClick}
      as={onClick ? 'button' : undefined}
    >
      {text}
      {!withoutIcon && (iconSide === 'right' ? <CaretRight /> : <CaretLeft />)}
    </ActionLinkContainer>
  )
}
