<<<<<<< HEAD
import Layout from '@/components/layout'
import BlockHTML from '@/components/blockhtml'
import PageHTML from '@/components/pagehtml'
=======
import Layout from '@/components/Layout'
import PageHTML from '@/components/PageHTML'
>>>>>>> 92377ee (Black theme)
import Link from 'next/link'
import Image from 'next/image'
import LoginIcon from '@mui/icons-material/Login';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
const { Client } = require('@notionhq/client')
<<<<<<< HEAD
import { getIcon, getCover } from '@/pages/api/getdata'

=======
>>>>>>> 92377ee (Black theme)

import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

<<<<<<< HEAD
export default function Home(props) {
  useEffect(()=>{
      console.log('POST DATA:', props)
    })
    const router = useRouter()

    const head = {
      icon: getIcon(props.blogHead),
      img: getCover(props.blogHead),
      title: props.blogHead.properties.Title.title[0]? props.blogHead.properties.Title.title[0].plain_text : 'UNDEFINED TITLE OF POST!'
=======
export default function PostPage({postHead, postChildren}) {
  useEffect(()=>{
//      console.log('POST DATA:', postHead, postChildren)
    })
    const router = useRouter()

    const postHeadData = {
      icon: postHead.icon? postHead.icon.emoji || <img src={postHead.icon.external?.url} height='30'/> : null,
      img: postHead.cover? postHead.cover[postHead.cover.type]?.url : null,
      title: postHead.properties.Title.title[0]?.plain_text ?? 'UNDEFINED TITLE OF POST!'
>>>>>>> 92377ee (Black theme)
    }

    return (
      <div className='post-list-item'>
      <Card sx={{ maxWidth: 680 }}>
<<<<<<< HEAD
        {head.img?
          <CardMedia
            sx={{ height: 210 }}
            image={head.img}
            title={head.title}
=======
        {postHeadData.img?
          <CardMedia
            sx={{ height: 210 }}
            image={postHeadData.img}
            title={postHeadData.title}
>>>>>>> 92377ee (Black theme)
          />
        : ''}
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
<<<<<<< HEAD
            {head.icon}
            {head.title}
          </Typography>

          <PageHTML pg={props.blogChildren}/>
=======
            {postHeadData.icon}
            {postHeadData.title}
          </Typography>

          <PageHTML pageContent={postChildren}/>
>>>>>>> 92377ee (Black theme)

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
<<<<<<< HEAD
      blogHead: responseHead,
      blogChildren: responseChildren.results,
=======
      postHead: responseHead,
      postChildren: responseChildren.results,
>>>>>>> 92377ee (Black theme)
      pageID: pageId
    },
    revalidate: 60
  }
}

<<<<<<< HEAD


=======
>>>>>>> 92377ee (Black theme)
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
<<<<<<< HEAD
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      }
    ],
=======
>>>>>>> 92377ee (Black theme)
  });

  const paths = response.results.map((post) => ({
    params: { post_id: post.id }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

