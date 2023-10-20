import { Heading, Text } from '@/components/typography'
import { ReactNode } from 'react'
import { ProfileDetailItemContainer } from './styles'

interface ProfileDetailsItemProps {
  icon: ReactNode
  info: string | number
  label: string
}

export function ProfileDetailsItem({
  icon,
  info,
  label,
}: ProfileDetailsItemProps) {
  return (
    <ProfileDetailItemContainer>
      {icon}
      <div>
        <Heading color="gray-200" size="xs">
          {info}
        </Heading>
        <Text size="sm" color="gray-300">
          {label}
        </Text>
      </div>
    </ProfileDetailItemContainer>
  )
}
