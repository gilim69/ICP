import Layout from '@/components/Layout'
import PageHTML from '@/components/PageHTML'
import Link from 'next/link'
import Image from 'next/image'
import LoginIcon from '@mui/icons-material/Login';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
const { Client } = require('@notionhq/client')

import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function PostPage({postHead, postChildren}) {
  useEffect(()=>{
      console.log('POST DATA:', postHead, postChildren)
    })
    const router = useRouter()

    const postHeadData = {
      icon: postHead.icon? postHead.icon.emoji || <img src={postHead.icon.external?.url} height='30'/> : null,
      img: postHead.cover? postHead.cover[postHead.cover.type]?.url : null,
      title: postHead.properties.Title.title[0]?.plain_text ?? 'UNDEFINED TITLE OF POST!'
    }

    return (
      <div className='post-list-item'>
      <Card sx={{ maxWidth: 680, backgroundColor: 'black' }}>
        {postHeadData.img?
          <CardMedia
            sx={{ height: 210 }}
            image={postHeadData.img}
            title={postHeadData.title}
          />
        : ''}
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {postHeadData.icon}
            {postHeadData.title}
          </Typography>

          <PageHTML pageContent={postChildren}/>

        </CardContent>

          <CardActions>
              <Button size="small" 
                onClick={() => router.back()} 
                startIcon={<ArrowBackIcon/>}
                sx={{ color: 'gold' }}
              >
                  Return
                </Button>
          </CardActions>
      </Card>
      </div>
    );
}

export async function getStaticProps({params}) {
  const pageId = params.post_id
  const notion = new Client({ auth: process.env.NOTION_KEY })
  const responseHead = await notion.pages.retrieve({ page_id: pageId });
  const responseChildren = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 50,
  });

  return {
    props: {
      postHead: responseHead,
      postChildren: responseChildren.results,
      pageID: pageId
    },
    revalidate: 60
  }
}

export async function getStaticPaths() {
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
  });

  const paths = response.results.map((post) => ({
    params: { post_id: post.id }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

