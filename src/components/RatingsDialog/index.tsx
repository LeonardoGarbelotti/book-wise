import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode, useEffect, useState } from 'react'
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
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

import { CategoriesOnBooks, Category } from '@prisma/client'
import { BookWithAvgRating } from '../BookCard'
import { RatingWithAuthor } from '../BookRatings/UserRatingCard'
import { useRouter } from 'next/router'

type BookDetails = BookWithAvgRating & {
  ratings: RatingWithAuthor[]
  categories: (CategoriesOnBooks & {
    category: Category
  })[]
}

interface RatingDialogProps {
  bookId: string
  children: ReactNode
}

export function RatingsDialog({ children, bookId }: RatingDialogProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const { data: book } = useQuery<BookDetails>(
    ['book', bookId],
    async () => {
      const { data } = await api.get(`/books/details/${bookId}`)
      return data?.book ?? {}
    },
    {
      enabled: open,
    },
  )

  const paramBookId = router.query.book as string
  const ratingsLength = book?.ratings.length ?? 0
  const categoriesList =
    book?.categories?.map((book) => book?.category?.name)?.join(', ') ?? ''

  useEffect(() => {
    if (paramBookId === bookId) {
      setOpen(true)
    }
  }, [bookId, paramBookId])

  function handleOpenChange(open: boolean) {
    if (open) {
      router.push(`/explore?book=${bookId}`, undefined, { shallow: true })
    } else {
      router.push('explore', undefined, { shallow: true })
    }
    setOpen(open)
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay>
          <DialogContent>
            <DialogClose>
              <X size={24} />
            </DialogClose>
            {!book ? (
              <p>Carregando...</p>
            ) : (
              <>
                <BookDetailsWrapper>
                  <BookDetailsContainer>
                    <BookImage
                      width={171}
                      height={242}
                      alt={book.name}
                      src={book.cover_url}
                    />
                    <BookContent>
                      <div>
                        <Heading size="sm">{book.name}</Heading>
                        <Text color="gray-300" css={{ marginTop: '$2' }}>
                          {book.author}
                        </Text>
                      </div>
                      <div>
                        <RatingStars rating={book.avgRating} size="md" />
                        <Text
                          color="gray-400"
                          size="sm"
                          css={{ marginTop: '$1' }}
                        >
                          {ratingsLength}{' '}
                          {ratingsLength === 1 ? 'avaliação' : 'avaliações'}
                        </Text>
                      </div>
                    </BookContent>
                  </BookDetailsContainer>
                  <BookInfos>
                    <BookInfo
                      info={categoriesList}
                      title="Categorias"
                      icon={<BookmarkSimple />}
                    />
                    <BookInfo
                      info={String(book.total_pages)}
                      title="Páginas"
                      icon={<BookOpen />}
                    />
                  </BookInfos>
                </BookDetailsWrapper>
                <BookRatings bookId={book.id} ratings={book.ratings} />
              </>
            )}
          </DialogContent>
        </DialogOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
