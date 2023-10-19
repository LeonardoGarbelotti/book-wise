import { DefaultLayout } from '@/layouts/DefaultLayout'
import { NextSeo } from 'next-seo'
import { NextPageWithLayout } from '../_app.page'

const ProfilePage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo
        title="Meu Perfil | BookWise"
        description="Meu perfil na BookWise"
      />
      <h1>relow everinian</h1>
    </>
  )
}

ProfilePage.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default ProfilePage
