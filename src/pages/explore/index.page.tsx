import { DefaultLayout } from '@/layouts/DefaultLayout'
import { NextSeo } from 'next-seo'
import { NextPageWithLayout } from '../_app.page'
import { BooksContainer, ExploreContainer, TagsContainer } from './styles'
import { PageTitle } from '@/components/ui/PageTitle'
import { Binoculars, MagnifyingGlass } from '@phosphor-icons/react'
import { Input } from './components/Input'
import { useState } from 'react'
import { Tag } from './components/Tag'
import { BookCard, BookWithAvgRating } from '@/components/BookCard'
import { useQuery } from '@tanstack/react-query'
import { Category } from '@prisma/client'
import { api } from '@/lib/axios'

const Explore: NextPageWithLayout = () => {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const { data: categories } = useQuery<Category[]>(
    ['categories'],
    async () => {
      const { data } = await api.get('/books/categories')
      return data?.categories ?? []
    },
  )

  const { data: books } = useQuery<BookWithAvgRating[]>(
    ['books', selectedCategory],
    async () => {
      const { data } = await api.get('/books', {
        params: {
          category: selectedCategory,
        },
      })
      return data?.books ?? []
    },
  )

  const searchedBook = books?.filter((book) => {
    return (
      book.name.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <>
      <NextSeo
        title="Explorar | BookWise"
        description="Descubra seu próximo livro favorito na BookWise"
      />
      <ExploreContainer>
        <header>
          <PageTitle icon={<Binoculars size={32} />} pageTitle="Explorar" />
          <Input
            placeholder="Buscar livro ou autor..."
            icon={<MagnifyingGlass size={20} />}
            css={{
              maxWidth: 433,
            }}
            value={search}
            onChange={({ target }) => setSearch(target.value)}
          />
        </header>
        <TagsContainer>
          <Tag
            active={selectedCategory === null}
            onClick={() => setSelectedCategory(null)}
          >
            Tudo
          </Tag>
          {categories?.map((category) => (
            <Tag
              key={category?.id}
              active={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category?.name}
            </Tag>
          ))}
        </TagsContainer>
        <BooksContainer>
          {searchedBook?.map((book) => (
            <BookCard key={book.id} size="lg" book={book} />
          ))}
        </BooksContainer>
      </ExploreContainer>
    </>
  )
}

Explore.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default Explore
