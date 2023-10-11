import { DefaultLayout } from '@/layouts/DefaultLayout'
import { NextSeo } from 'next-seo'
import { NextPageWithLayout } from '../_app.page'

const Explore: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo
        title="Explorar | BookWise"
        description="Descubra seu próximo livro favorito na BookWise"
      />
      <div>Explorar</div>
    </>
  )
}

Explore.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default Explore
