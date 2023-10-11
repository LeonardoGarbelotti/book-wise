import { PageTitle } from '@/components/ui/PageTitle'
import { LatestRatingsContainer } from './styles'
import { ChartLineUp } from '@phosphor-icons/react'
import { Text } from '@/components/typography'
import { RatingCard, RatingWithAuthorAndBook } from '@/components/RatingCard'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export function LatestRatings() {
  const { data: ratings } = useQuery<RatingWithAuthorAndBook[]>(
    ['latest-ratings'],
    async () => {
      const { data } = await api.get('/ratings/latest')
      return data.ratings ?? []
    },
  )

  return (
    <LatestRatingsContainer>
      <PageTitle
        pageTitle="Início"
        icon={<ChartLineUp size={32} />}
        css={{ marginBottom: 40 }}
      />
      <Text size="sm">Avaliações mais recentes</Text>
      <section>
        {ratings?.map((rating) => (
          <RatingCard key={rating.id} rating={rating} />
        ))}
      </section>
    </LatestRatingsContainer>
  )
}
