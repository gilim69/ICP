import Link from 'next/link'
//import LoginIcon from '@mui/icons-material/Login'       //version with auth
import { useState} from 'react'
const { Client } = require('@notionhq/client')
import BlockHTML from '@components/BlockHTML'
import PostCard from '@components/PostCard'
import lang from '../locales/lang'

import { aX } from '@fullcalendar/core/internal-common'


export default function Home({allData}) {
  const t = lang()
  //console.log('Home props ', allData)
  const localeData = allData.filter((e)=>
      e.properties.Language.multi_select.some(item => item.name.includes(t.locale))
    )  

  const postCardsData = localeData.map((e) => {
      return {
        id: e.id,
        cover: e.cover? e.cover[e.cover.type]?.url : null,
        icon: e.icon? e.icon.emoji || <img src={e.icon.external?.url} height='30'/> : null,
        title: e.properties.Title.title[0]? e.properties.Title.title[0].plain_text : 'UNDEFINED TITLE OF POST!',
        description: <BlockHTML blockData={e.properties.Description}/>,
        link: !e.properties.NoMoreInfo.checkbox
      }
    })

  return (
    <>
      <div className='bg-animation'> </div>

      <div className='first-title'>{t.ICP.toUpperCase()}</div>

      <div className='post-list' id='blog'>
          {postCardsData.map((e, ind) => {
            return (
            <div key={ind} className='post-list-item'>
              {e.link?
              <Link href={`/blog/${e.id}`}>
                <PostCard postCardData={e} />
              </Link>
              : <PostCard postCardData={e} />
              }
            </div>
            )
          })}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const notion = new Client({ auth: process.env.NOTION_KEY})
  const databaseId = process.env.NOTION_DB_BLOGS_ID
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        }
      ],
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],

  })
 
  return {
    props: {
      allData: response.results
    }
  }
}




