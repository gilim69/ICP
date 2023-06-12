import * as React from 'react'
import { NotionAPI } from 'notion-client'
import NotionPage from '@components/NotionPage'


export default function Test({pageData}) {
    return (
            <NotionPage pageData={pageData} fullPage={true}/>
        )
}

export async function getServerSideProps({locale}) {
    let pageId = locale==='es'? '865209aad6574775a5aa0836de25a493' :
      locale==='ru'? '688e4b7017e14fb695662963cc2bdde1' : '04246023eca9412a9c9a3e6dc53c0190'
  
    const notion = new NotionAPI({ auth: process.env.NOTION_KEY })
    const pageData = await notion.getPage(pageId)

    return {
      props: {
        pageData: pageData,
      }
    }
  }
  