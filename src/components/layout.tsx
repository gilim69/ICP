import Head from 'next/head'
import Navbar from './navbar'

function Layout({title, keywords, description, children, language}) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description}/>
                <meta name='keywords' content={keywords}/>
                <meta name='language' content={language}/>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
                <meta charset='utf-8'/>
            </Head>
            <Navbar />
            {children}
        </div>
    )
}
export default Layout

{Layout.defaultProps = {
    title: 'International club of Puebla',
    description:'Site of International club of Puebla. About club, events, contacts. Media resources of club.',
    keywords: 'Puebla, international, club, event',
    language: 'en'}
  }