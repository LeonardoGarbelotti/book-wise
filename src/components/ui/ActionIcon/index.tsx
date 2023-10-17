import { ComponentProps, ReactNode } from 'react'
import { theme } from '../../../../stitches.config'
import { ActionIconContainer } from './styles'

interface ActionIconProps extends ComponentProps<typeof ActionIconContainer> {
  icon: ReactNode
  iconColor: keyof typeof theme.colors
}

export function ActionIcon({ icon, iconColor, ...props }: ActionIconProps) {
  return (
    <ActionIconContainer
      {...props}
      css={{
        color: `$${iconColor}`,
      }}
    >
      {icon}
    </ActionIconContainer>
  )
}
