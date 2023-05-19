//Events page
import Link from 'next/link'
import { useEffect } from 'react'
import Layout from '@/components/layout'
import Image from 'next/image'
const { Client } = require('@notionhq/client')
import EventRecord from '@/components/eventrecord'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

export default function Home({results}) {

  useEffect(()=>{
    console.log(results[0].properties.photo.files)
  })

  const imgList = results.filter((el)=>el.properties.photo.files.length>0)

  return (
    <>  
      <Layout>  
        <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
          <ImageList variant="masonry" cols={3} gap={8}>
            {imgList.map((item) => (
 //             <ImageListItem key={item.id}>
                <Image key={item.id}
                  src={`${item.properties.photo.files[0].file.url}?w=248&fit=crop&auto=format`}
//                  srcSet={`${item.properties.photo.files[0].file.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.properties.name.title[0].plain_text}
                  width={300}
                  height={213}
//                  loading="lazy"
                />
 //             </ImageListItem> 
              ))}
          </ImageList>
        </Box>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_KEY1})
  const databaseId = process.env.NOTION_DB_PHOTOS_ID
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: 'name',
        direction: 'ascending',
      }
    ],
  });
  return {
    props: {
      results: response.results
      }
  }
}


