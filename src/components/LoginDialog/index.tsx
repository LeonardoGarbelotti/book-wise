import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import {
  AuthButtonsContainer,
  DialogClose,
  DialogContent,
  DialogOverlay,
} from './styles'
import { X } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { Heading } from '../typography'
import { AuthButtons } from '../AuthButtons'
import GoogleIcon from '@/assets/icons/google.svg'
import GitHubIcon from '@/assets/icons/github.svg'

interface LoginDialogProps {
  children: ReactNode
}

export function LoginDialog({ children }: LoginDialogProps) {
  const router = useRouter()
  const paramBookId = router.query.book as string

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <DialogClose>
            <X size={24} />
          </DialogClose>

          <div>
            <Heading size="xs" color="gray-200" css={{ marginBottom: 40 }}>
              Faça login para deixar sua avaliação
            </Heading>
            <AuthButtonsContainer>
              <AuthButtons
                text="Entrar com Google"
                iconPath={GoogleIcon}
                signInProvider="google"
                callbackUrl={
                  paramBookId ? `/explore?book=${paramBookId}` : '/explore'
                }
              />
              <AuthButtons
                text="Entrar com GitHub"
                iconPath={GitHubIcon}
                signInProvider="github"
                callbackUrl={
                  paramBookId ? `/explore?book=${paramBookId}` : '/explore'
                }
              />
            </AuthButtonsContainer>
          </div>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
