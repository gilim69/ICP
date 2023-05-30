import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
<<<<<<< HEAD
import { UserProvider } from '@auth0/nextjs-auth0/client'
import Layout from '@/components/layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
=======
//import { UserProvider } from '@auth0/nextjs-auth0/client'  version with auth
import Layout from '@/components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
 {/*   <UserProvider> version with auth */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
 {/*   </UserProvider> version with auth */}
 </>
>>>>>>> 92377ee (Black theme)
  );
}
