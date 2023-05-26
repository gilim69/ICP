import Link from 'next/link'
import LoginIcon from '@mui/icons-material/Login';
import { useEffect, useRef, useState} from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0/client'
const { Client } = require('@notionhq/client')
import Layout from '@/components/layout'
import BlockHTML from '@/components/blockhtml'
import PostCard from '@/components/postcard'
//import CustomizedDialogs from '@/components/whatsappinv'        //popup dialog to join to whatsapp group
import { getIcon, getCover } from '@/pages/api/getdata'

export default function Home({results}) {
//  const ref = useRef()

  const img1 = '/puebla1.jpg'
  const img2 = '/puebla2.jpg'
  const img3 = '/puebla3.jpg'
  const list = [img1, img2, img3]

  let [lsNum, setLsNum] = useState(2);

  useEffect(()=>{
    console.log('BlogList DB Records:', results)
  })

/*  setTimeout(()=> { 
    const i = lsNum>2? 0 : lsNum+1
    setLsNum(i)
    const css =  'url('+list[lsNum]+')'
    ref.current.style.backgroundImage = {css}
    console.log(ref)}, 4000) */

  const postData = results.map((e) => {
      return {
        id: e.id,
        icon: getIcon(e),
        title: e.properties.Title.title[0]? e.properties.Title.title[0].plain_text : 'UNDEFINED TITLE OF POST!',
        description: <BlockHTML bl={e.properties.Description}/>,
        img: getCover(e),
        button: !e.properties.NoMoreInfo.checkbox
      }
    })

  return (
    <>
      <div className='bg-animation'> </div>
      <h1 className='first-title'>International club of Puebla</h1>


      {/*  <CustomizedDialogs /> */}

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
      and: [
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
        {
          property: 'Language',
          select: {
            equals: 'English',
          },
        }
      ],
    },

  });
 
  return {
    props: {
      results: response.results
    },
    revalidate: 60
  }
}

