import { ReactNode } from 'react'
import { NavItemContainer } from './styles'
import { useRouter } from 'next/router'

interface NavigationProps {
  label: string
  href: string
  icon: ReactNode
}

export function NavigationLink({ label, href, icon }: NavigationProps) {
  const router = useRouter()
  return (
    <NavItemContainer href={href} active={router.asPath === href}>
      {icon}
      {label}
    </NavItemContainer>
  )
}
