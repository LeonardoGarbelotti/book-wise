import { PageTitle } from '@/components/ui/PageTitle'
import { LatestContainer, LatestRatingsContainer } from './styles'
import { ChartLineUp } from '@phosphor-icons/react'
import { Text } from '@/components/typography'
import { RatingCard, RatingWithAuthorAndBook } from '@/components/RatingCard'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { ActionLink } from '@/components/ui/ActionLink'

export function LatestRatings() {
  const { data: ratings } = useQuery<RatingWithAuthorAndBook[]>(
    ['latest-ratings'],
    async () => {
      const { data } = await api.get('/ratings/latest')
      return data.ratings ?? []
    },
  )

  const { data: session } = useSession()

  const userId = session?.user?.id

  const { data: latestUserRating } = useQuery<RatingWithAuthorAndBook>(
    ['latest-user-rating', userId],
    async () => {
      const { data } = await api.get('/ratings/user-latest')
      return data?.rating ?? null
    },
    {
      enabled: !!userId,
    },
  )

  return (
    <LatestRatingsContainer>
      <PageTitle
        pageTitle="Início"
        icon={<ChartLineUp size={32} />}
        css={{ marginBottom: 40 }}
      />

      {latestUserRating && (
        <LatestContainer>
          <header>
            <Text size="sm">Sua última leitura</Text>

            <ActionLink text="Ver todas" href={`/profile/${userId}`} />
          </header>

          <RatingCard variant="compact" rating={latestUserRating} />
        </LatestContainer>
      )}

      <Text size="sm">Avaliações mais recentes</Text>
      <section>
        {ratings?.map((rating) => (
          <RatingCard key={rating.id} rating={rating} />
        ))}
      </section>
    </LatestRatingsContainer>
  )
}
