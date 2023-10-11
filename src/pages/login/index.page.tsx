import {
  AuthButtonsContainer,
  LoginContainer,
  LogoSection,
  WelcomeSection,
} from './styles'
import { Heading, Text } from '@/components/typography'
import { AuthButtons } from '@/components/AuthButtons'
import Image from 'next/image'
import GoogleIcon from '@/assets/icons/google.svg'
import GitHubIcon from '@/assets/icons/github.svg'
import RocketIcon from '@/assets/icons/rocket.svg'
import { NextSeo } from 'next-seo'

export default function Login() {
  return (
    <>
      <NextSeo
        title="Login | BookWise"
        description="Crie sua conta e começe já a utilizar a plataforma da BookWise"
      />
      <LoginContainer>
        <LogoSection>
          <Image
            src="/images/logo.svg"
            alt="BookWise Logo"
            width={232}
            height={58}
          />
        </LogoSection>
        <WelcomeSection>
          <Heading size="lg" color="gray-100">
            Boas Vindas!
          </Heading>
          <Text color="gray-200">Faça seu login ou acesso como visitante.</Text>
          <AuthButtonsContainer>
            <AuthButtons
              text="Entrar com Google"
              iconPath={GoogleIcon}
              signInProvider="google"
            />
            <AuthButtons
              text="Entrar com GitHub"
              iconPath={GitHubIcon}
              signInProvider="github"
            />
            <AuthButtons
              text="Entrar como visitante"
              iconPath={RocketIcon}
              signInProvider="visitor"
            />
          </AuthButtonsContainer>
        </WelcomeSection>
      </LoginContainer>
    </>
  )
}
