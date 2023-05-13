import Head from 'next/head'
import Layout from '@/components/layout'
import SignInSide from '@/components/signINcomp'

export default function Signin() {
  return (
    <Layout>
      <main>
        <SignInSide/>
      </main>
    </Layout>
  )
}