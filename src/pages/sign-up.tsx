import Head from 'next/head'
import Layout from '@/components/layout'
import SignUp from '@/components/signUpcomp'

export default function Home() {
  return (
    <Layout>
      <main>
        <SignUp/>
      </main>
    </Layout>
  )
}