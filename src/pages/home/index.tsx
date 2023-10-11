import { DefaultLayout } from '@/layouts/DefaultLayout'
import { NextSeo } from 'next-seo'
import { NextPageWithLayout } from '../_app.page'
import { HomeContainer } from './styles'
import { LatestRatings } from './components/LatestRatings'
import { PopularBooks } from './components/PopularBooks'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo
        title="Início | BookWise"
        description="Descubra seu próximo livro favorito na BookWise"
      />
      <HomeContainer>
        <LatestRatings />
        <PopularBooks />
      </HomeContainer>
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default Home
