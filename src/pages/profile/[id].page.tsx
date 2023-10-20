import { DefaultLayout } from '@/layouts/DefaultLayout'
import { NextSeo } from 'next-seo'
import { NextPageWithLayout } from '../_app.page'
import { HomeContainer } from '../home/styles'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { api } from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { ProfileRatingData, ProfileRatings } from './components/ProfileRatings'
import { ProfileDetails } from './components/ProfileDetails'

export type ProfileData = {
  ratings: ProfileRatingData[]
  user: {
    avatar_url: string
    name: string
    member_since: string
  }
  readPages: number
  ratedBooks: number
  readAuthors: number
  mostReadCategory?: string
}

const ProfilePage: NextPageWithLayout = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const userId = router.query.id as string

  const { data: profile } = useQuery<ProfileData>(
    ['profile', userId],
    async () => {
      const { data } = await api.get(`/profile/${userId}`)
      return data?.profile ?? {}
    },
    {
      enabled: !!userId,
    },
  )

  const isOwnProfile = session?.user?.id === userId

  return (
    <>
      <NextSeo
        title={`Perfil de ${profile?.user.name} | BookWise`}
        description="Meu perfil na BookWise"
      />
      <HomeContainer>
        {profile ? (
          <>
            <ProfileRatings
              isOwnProfile={isOwnProfile}
              ratings={profile?.ratings}
            />
            <ProfileDetails profile={profile} />
          </>
        ) : (
          <>
            <h1>Carregando...</h1>
          </>
        )}
      </HomeContainer>
    </>
  )
}

ProfilePage.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default ProfilePage
