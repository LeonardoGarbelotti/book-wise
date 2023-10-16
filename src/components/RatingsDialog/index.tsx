import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import {
  BookContent,
  BookDetailsContainer,
  BookDetailsWrapper,
  BookImage,
  BookInfos,
  DialogClose,
  DialogContent,
  DialogOverlay,
} from './styles'
import { BookOpen, BookmarkSimple, X } from '@phosphor-icons/react'
import { Heading, Text } from '../typography'
import { RatingStars } from '../RatingStars'
import { BookInfo } from './BookInfo'
import { BookRatings } from '../BookRatings'

interface RatingDialogProps {
  children: ReactNode
}

export function RatingsDialog({ children }: RatingDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay>
          <DialogContent>
            <DialogClose>
              <X size={24} />
            </DialogClose>
            <BookDetailsWrapper>
              <BookDetailsContainer>
                <BookImage
                  width={171}
                  height={242}
                  alt="Book name"
                  src="https://github.com/LeonardoGarbelotti.png"
                />
                <BookContent>
                  <div>
                    <Heading size="sm">Título do Livro</Heading>
                    <Text color="gray-300" css={{ marginTop: '$2' }}>
                      Autor
                    </Text>
                  </div>
                  <div>
                    <RatingStars rating={0} size="md" />
                    <Text color="gray-400" size="sm" css={{ marginTop: '$1' }}>
                      2 avaliações
                    </Text>
                  </div>
                </BookContent>
              </BookDetailsContainer>
              <BookInfos>
                <BookInfo
                  info="Ficção, Horror"
                  title="Categorias"
                  icon={<BookmarkSimple />}
                />
                <BookInfo info="216" title="Páginas" icon={<BookOpen />} />
              </BookInfos>
            </BookDetailsWrapper>
            <BookRatings />
          </DialogContent>
        </DialogOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
