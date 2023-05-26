import Layout from '@/components/layout'
import BlockHTML from '@/components/blockhtml'
import PageHTML from '@/components/pagehtml'
import Link from 'next/link'
import Image from 'next/image'
import LoginIcon from '@mui/icons-material/Login';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
const { Client } = require('@notionhq/client')
import { getIcon, getCover } from '@/pages/api/getdata'


import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function Home(props) {
  useEffect(()=>{
      console.log('POST DATA:', props)
    })
    const router = useRouter()

    const head = {
      icon: getIcon(props.blogHead),
      img: getCover(props.blogHead),
      title: props.blogHead.properties.Title.title[0]? props.blogHead.properties.Title.title[0].plain_text : 'UNDEFINED TITLE OF POST!'
    }

    return (
      <div className='post-list-item'>
      <Card sx={{ maxWidth: 680 }}>
        {head.img?
          <CardMedia
            sx={{ height: 210 }}
            image={head.img}
            title={head.title}
          />
        : ''}
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {head.icon}
            {head.title}
          </Typography>

          <PageHTML pg={props.blogChildren}/>

        </CardContent>

          <CardActions>
              <Button size="small" onClick={() => router.back()} startIcon={<ArrowBackIcon/>}>Return</Button>
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
      blogHead: responseHead,
      blogChildren: responseChildren.results,
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
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      }
    ],
  });

  const paths = response.results.map((post) => ({
    params: { post_id: post.id }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

