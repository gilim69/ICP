import Layout from '@/components/layout'
import Link from 'next/link'
import LoginIcon from '@mui/icons-material/Login';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0/client'
const { Client } = require('@notionhq/client')
import Button from '@mui/material/Button'
import PostCard from '@/components/postcard'
import CustomizedDialogs from '@/components/whatsappinv'
import { getBlock, getIcon, getPageData } from '@/pages/api/getdata'

export default function Home({results}) {
  useEffect(()=>{
    console.log('BlogList DB Records:', results)
  })

  const postData = results.map((e) => {
      return {
        id: e.id,
        title: e.properties.Title.title[0]? e.properties.Title.title[0].plain_text : 'UNDEFINED TITLE OF POST!',
        description: getBlock(e.properties.Description),
        img: e.cover? e.cover.external.url : null,
        button: !e.properties.NoMoreInfo.checkbox
      }
    }
  )

  return (
    <>
    
      <h1 className='first-title'>International club of Puebla</h1>

      <h6 className='title'> Are you not in our Whatsapp group yet? </h6>

      <div className='title'>
        <Link href='https://chat.whatsapp.com/G1xRRP5Qy6R5ps0LpkjGCt'>
          <Button variant="text" startIcon={<img src='/whatsapp-50.png' width='21' />}>Join to Whatsapp group</Button>
        </Link>
      </div>

      <CustomizedDialogs />

      <div className='post-list'>
        {postData.map((e, ind) => {
          return (
          <div key={ind} className='post-list-item'>
            <PostCard p={e} />
          </div>
          )
        })}
      </div>

    </>
  )
}

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_KEY})
  const databaseId = process.env.NOTION_DB_BLOGS_ID
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [
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
      }
    ],
  });
 
  return {
    props: {
      results: response.results
    }
  }
}

