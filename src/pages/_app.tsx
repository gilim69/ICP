import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import Layout from '@/components/layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
