import { ReactNode } from 'react'
import { PageTitleContainer } from './styles'
import { ComponentProps } from '@stitches/react'
import { Heading } from '@/components/typography'

interface PageTitleProps extends ComponentProps<typeof PageTitleContainer> {
  icon: ReactNode
  pageTitle: string
}

export function PageTitle({ icon, pageTitle, ...props }: PageTitleProps) {
  return (
    <PageTitleContainer {...props}>
      {icon}
      <Heading size="lg">{pageTitle}</Heading>
    </PageTitleContainer>
  )
}
