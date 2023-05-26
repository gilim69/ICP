import Layout from '@/components/layout'
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
      console.log('Contacts:', props)
    })
    const router = useRouter()

    const head = {
      icon: getIcon(props.blogHead),
      img: getCover(props.blogHead),
      title: 'Contacts'
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
          <Typography gutterBottom variant="h5" component="div">
            {head.icon}
            {head.title}
          </Typography>

            <PageHTML pg={props.blogChildren}/>

        </CardContent>
      </Card>
      </div>
    );
}

export async function getStaticProps() {
  const pageId = '04246023eca9412a9c9a3e6dc53c0190'
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

