import Link from 'next/link'
<<<<<<< HEAD
import LoginIcon from '@mui/icons-material/Login';
=======
//import LoginIcon from '@mui/icons-material/Login'
>>>>>>> 92377ee (Black theme)
import { useEffect, useRef, useState} from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0/client'
const { Client } = require('@notionhq/client')
<<<<<<< HEAD
import Layout from '@/components/layout'
import BlockHTML from '@/components/blockhtml'
import PostCard from '@/components/postcard'
//import CustomizedDialogs from '@/components/whatsappinv'        //popup dialog to join to whatsapp group
import { getIcon, getCover } from '@/pages/api/getdata'

export default function Home({results}) {
=======
import Layout from '@/components/Layout'
import BlockHTML from '@/components/BlockHTML'
import PostCard from '@/components/PostCard'

export default function Home({blogDbData}) {
>>>>>>> 92377ee (Black theme)
//  const ref = useRef()

  const img1 = '/puebla1.jpg'
  const img2 = '/puebla2.jpg'
  const img3 = '/puebla3.jpg'
  const list = [img1, img2, img3]

  let [lsNum, setLsNum] = useState(2);

  useEffect(()=>{
<<<<<<< HEAD
    console.log('BlogList DB Records:', results)
=======
    console.log('Blog DB Records:', blogDbData[0])
>>>>>>> 92377ee (Black theme)
  })

/*  setTimeout(()=> { 
    const i = lsNum>2? 0 : lsNum+1
    setLsNum(i)
    const css =  'url('+list[lsNum]+')'
    ref.current.style.backgroundImage = {css}
    console.log(ref)}, 4000) */

<<<<<<< HEAD
  const postData = results.map((e) => {
      return {
        id: e.id,
        icon: getIcon(e),
        title: e.properties.Title.title[0]? e.properties.Title.title[0].plain_text : 'UNDEFINED TITLE OF POST!',
        description: <BlockHTML bl={e.properties.Description}/>,
        img: getCover(e),
=======
  const postCardsData = blogDbData.map((e) => {
      return {
        id: e.id,
        cover: e.cover? e.cover[e.cover.type]?.url : null,
        icon: e.icon? e.icon.emoji || <img src={e.icon.external?.url} height='30'/> : null,
        title: e.properties.Title.title[0]? e.properties.Title.title[0].plain_text : 'UNDEFINED TITLE OF POST!',
        description: <BlockHTML blockData={e.properties.Description}/>,
>>>>>>> 92377ee (Black theme)
        button: !e.properties.NoMoreInfo.checkbox
      }
    })

  return (
    <>
      <div className='bg-animation'> </div>
<<<<<<< HEAD
      <h1 className='first-title'>International club of Puebla</h1>
=======
      <div className='first-title'>International club of Puebla</div>
>>>>>>> 92377ee (Black theme)


      {/*  <CustomizedDialogs /> */}

        <div className='post-list'>
<<<<<<< HEAD
          {postData.map((e, ind) => {
            return (
            <div key={ind} className='post-list-item'>
              <PostCard p={e} />
=======
          {postCardsData.map((e, ind) => {
            return (
            <div key={ind} className='post-list-item'>
              <PostCard postCardData={e} />
>>>>>>> 92377ee (Black theme)
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
<<<<<<< HEAD
      results: response.results
=======
      blogDbData: response.results
>>>>>>> 92377ee (Black theme)
    },
    revalidate: 60
  }
}

