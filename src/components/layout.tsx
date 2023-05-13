import Head from 'next/head'
import Navbar from '@/components/navbar'

export default function Layout(props) {
    return (
        <>
        <Head>
            <title>{props.title}</title>
            <meta name='description' content={props.description} />
            <meta name='keywords' content={props.keywords} />
            <meta name='language' content={props.language} />
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            <meta charSet='utf-8' />
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
