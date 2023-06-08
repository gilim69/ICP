import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { useTranslation } from "react-i18next"
//import { UserProvider } from '@auth0/nextjs-auth0/client'  version with auth
import Layout from '@components/Layout'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
 {/*   <UserProvider> version with auth */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
 {/*   </UserProvider> version with auth */}
 </>
  )
}
