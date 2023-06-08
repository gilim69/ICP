import Head from 'next/head'
import Script from 'next/script'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import React from 'react'
import lang from '../locales/lang'

export default function Layout(props) {
    const t = lang()
    return (
        <>
        <Head>
            <title key='title-layout'>{t.ICP}</title>
            <meta name='description' content={t.Head.description} key='meta1' />
            <meta name='keywords' content={t.Head.keywords} key='meta2' />
            <meta name='language' content={t.Head.language} key='meta3' />
            <meta name='viewport' content='width=device-width, initial-scale=1.0' key='meta4'/>
            <meta charSet='utf-8' key='meta5'/>
            <Script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.5/index.global.min.js'/>
        </Head>
        <div className='main-div'>
            <Navbar />
            {props.children}
            <Footer />
        </div>
        </>
    )
}

/*Layout.defaultProps = {
    title: 'International club of Puebla',
    description:'Site of International club of Puebla. About club, events, contacts. Media resources of club.',
    keywords: 'Puebla, international, club, event',
    language: 'en',
    }
*/
