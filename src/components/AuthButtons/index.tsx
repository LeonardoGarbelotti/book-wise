import Image from 'next/image'
import { AuthButton } from './styles'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

interface AuthButtonProps {
  text: string
  iconPath: string
  signInProvider: 'google' | 'github' | 'visitor'
  callbackUrl?: string
}

export function AuthButtons({
  text,
  iconPath,
  signInProvider,
  callbackUrl = '/',
}: AuthButtonProps) {
  const router = useRouter()

  async function handleSignIn(provider?: string) {
    if (signInProvider === 'visitor') {
      router.push(callbackUrl)
      return
    }

    await signIn(provider, {
      callbackUrl,
    })
  }
  return (
    <AuthButton onClick={() => handleSignIn(signInProvider)}>
      <Image src={iconPath} alt={text} />
      {text}
    </AuthButton>
  )
}
