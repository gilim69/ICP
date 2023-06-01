import Link from 'next/link'
//import LoginIcon from '@mui/icons-material/Login'       //version with auth
import { useEffect, useRef, useState} from 'react'
const { Client } = require('@notionhq/client')
import BlockHTML from '@/components/BlockHTML'
import PostCard from '@/components/PostCard'

export default function Home({blogDbData}) {
  const img1 = '/puebla1.jpg'
  const img2 = '/puebla2.jpg'
  const img3 = '/puebla3.jpg'
  const list = [img1, img2, img3]

  let [lsNum, setLsNum] = useState(2)

  useEffect(()=>{
   // console.log('Blog DB Records:', blogDbData[0])
  })

/*  setTimeout(()=> { 
    const i = lsNum>2? 0 : lsNum+1
    setLsNum(i)
    const css =  'url('+list[lsNum]+')'
    ref.current.style.backgroundImage = {css}
    console.log(ref)}, 4000) */

  const postCardsData = blogDbData.map((e) => {
      return {
        id: e.id,
        cover: e.cover? e.cover[e.cover.type]?.url : null,
        icon: e.icon? e.icon.emoji || <img src={e.icon.external?.url} height='30'/> : null,
        title: e.properties.Title.title[0]? e.properties.Title.title[0].plain_text : 'UNDEFINED TITLE OF POST!',
        description: <BlockHTML blockData={e.properties.Description}/>,
        button: !e.properties.NoMoreInfo.checkbox
      }
    })

  return (
    <>
      <div className='bg-animation'> </div>
      <div className='first-title'>INTERNATIONAL CLUB OF PUEBLA</div>


      {/*  <CustomizedDialogs /> */}

        <div className='post-list' id='blog'>
          {postCardsData.map((e, ind) => {
            return (
            <div key={ind} className='post-list-item'>
              {e.button?
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

  })
 
  return {
    props: {
      blogDbData: response.results
    },
    revalidate: 60
  }
}

