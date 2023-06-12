import * as React from 'react'
import Link from 'next/link'
import { NotionAPI } from 'notion-client'
import NotionPage from '@components/NotionPage'
import lang from '../../locales/lang'

export default function PostPage({pageData}) {
    let pdata = pageData
    delete pdata.collection[Object.keys(pdata.collection)[0]]
    const t = lang()
//    console.log('PG', pageData)
  
    return (
      <div className='post-list-item'>
            <NotionPage pageData={pdata} fullPage={true}/>
            <Link href='/'>
                <span>&#9668;&nbsp;{t.Navigation.back}</span>
            </Link>
      </div>
    )
}

export async function getServerSideProps({params}) {
  let pageId = params.post_id

  const notion = new NotionAPI()
  const pageData = await notion.getPage(pageId)

  return {
    props: {
      pageData: pageData,
    }
  }
}
