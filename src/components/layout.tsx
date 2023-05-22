import Head from 'next/head'
//import Script from 'next/script'
import Navbar from '@/components/navbar'
import React from 'react'

export default function Layout(props) {
    return (
        <>
        <Head>
            <title key='title-layout'>{props.title}</title>
            <meta name='description' content={props.description} key='meta1' />
            <meta name='keywords' content={props.keywords} key='meta2' />
            <meta name='language' content={props.language} key='meta3' />
            <meta name='viewport' content='width=device-width, initial-scale=1.0' key='meta4'/>
            <meta charSet='utf-8' key='meta5'/>
            <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.5/index.global.min.js'></script>
        </Head>
        <Navbar />
        {props.children}
        </>
    )
}

{Layout.defaultProps = {
    title: 'International club of Puebla',
    description:'Site of International club of Puebla. About club, events, contacts. Media resources of club.',
    keywords: 'Puebla, international, club, event',
    language: 'en',
    }
}
