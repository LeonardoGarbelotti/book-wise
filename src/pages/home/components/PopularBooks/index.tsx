import { Text } from '@/components/typography'
import { PopularBooksContainer } from './styles'
import { ActionLink } from '@/components/ui/ActionLink'
import { BookCard, BookWithAvgRating } from './BookCard'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export function PopularBooks() {
  const { data: popularBooks } = useQuery<BookWithAvgRating[]>(
    ['popular-books'],
    async () => {
      const { data } = await api.get('/books/popular')
      return data?.books ?? []
    },
  )
  return (
    <PopularBooksContainer>
      <header>
        <Text size="sm">Livros populares</Text>
        <ActionLink href="/explore" text="Ver todos" />
      </header>
      <section>
        {popularBooks?.map((book) => (
          <BookCard key={`popular-${book.id}`} book={book} />
        ))}
      </section>
    </PopularBooksContainer>
  )
}
