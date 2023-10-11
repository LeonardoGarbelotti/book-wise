import Image from 'next/image'
import {
  Container,
  LoginButton,
  NavigationContainer,
  UserDetails,
} from './styles'
import { NavigationLink } from './NavigationLink'

import {
  ChartLineUp,
  Binoculars,
  User,
  SignIn,
  SignOut,
} from '@phosphor-icons/react'
import { signOut, useSession } from 'next-auth/react'
import { Text } from '../typography'
import { Avatar } from '../ui/Avatar'

export function Sidebar() {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <Container>
      <div>
        <Image
          src="/images/logo.svg"
          alt="BookWise Logo"
          width={128}
          height={32}
        />
        <NavigationContainer>
          <NavigationLink
            href="/"
            icon={<ChartLineUp size={24} />}
            label="Início"
          />
          <NavigationLink
            href="/explore"
            icon={<Binoculars size={24} />}
            label="Explorar"
          />
          {user && (
            <NavigationLink
              href={`/profile/${user.id}`}
              icon={<User size={24} />}
              label="Perfil"
            />
          )}
        </NavigationContainer>
      </div>

      <footer>
        {!user ? (
          <LoginButton href="/login">
            Fazer login <SignIn size={24} />
          </LoginButton>
        ) : (
          <UserDetails>
            <Avatar size="sm" src={user.avatar_url} alt={user.name} />
            <Text size="sm">{user.name}</Text>
            <SignOut size={28} onClick={() => signOut()} />
          </UserDetails>
        )}
      </footer>
    </Container>
  )
}
