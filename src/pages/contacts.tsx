<<<<<<< HEAD
import Layout from '@/components/layout'
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
=======
export default function Contacts(props) {
>>>>>>> 92377ee (Black theme)
  useEffect(()=>{
      console.log('Contacts:', props)
    })
    const router = useRouter()
<<<<<<< HEAD

    const head = {
      icon: getIcon(props.blogHead),
      img: getCover(props.blogHead),
=======
    const e = props.pageHead
    const head = {
      cover: e.cover? e.cover[e.cover.type]?.url : null,
      icon: e.icon? e.icon.emoji || <img src={e.icon.external?.url} height='30'/> : null,
>>>>>>> 92377ee (Black theme)
      title: 'Contacts'
    }

    return (
      <div className='post-list-item'>
<<<<<<< HEAD
      <Card sx={{ maxWidth: 680 }}>
        {head.img?
          <CardMedia
            sx={{ height: 210 }}
            image={head.img}
=======
      <Card sx={{ maxWidth: 680, background: 'goldenrod' }}>
        {head.cover?
          <CardMedia
            sx={{ height: 210 }}
            image={head.cover}
>>>>>>> 92377ee (Black theme)
            title={head.title}
          />
        : ''}
        <CardContent>
<<<<<<< HEAD
          <Typography gutterBottom variant="h5" component="div">
=======
          <Typography gutterBottom variant="h4" component="div" color="text.primary">
>>>>>>> 92377ee (Black theme)
            {head.icon}
            {head.title}
          </Typography>

<<<<<<< HEAD
            <PageHTML pg={props.blogChildren}/>
=======
          <div style={{color: 'black'}}>
            <PageHTML pageContent={props.pageChildren}/>
          </div>
>>>>>>> 92377ee (Black theme)

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
<<<<<<< HEAD
      blogHead: responseHead,
      blogChildren: responseChildren.results,
=======
      pageHead: responseHead,
      pageChildren: responseChildren.results,
>>>>>>> 92377ee (Black theme)
      pageID: pageId
    },
    revalidate: 60
  }
}

