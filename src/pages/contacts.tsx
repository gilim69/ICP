import PageHTML from '@components/PageHTML'
//import LoginIcon from '@mui/icons-material/Login'  //version with auth
import { useEffect } from 'react'
import { useRouter } from 'next/router'
const { Client } = require('@notionhq/client')

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function Contacts(props) {
  useEffect(()=>{
      console.log('Contacts:', props)
    })
    const router = useRouter()
    const e = props.pageHead
    const head = {
      cover: e.cover? e.cover[e.cover.type]?.url : null,
      icon: e.icon? e.icon.emoji || <img src={e.icon.external?.url} height='30'/> : null,
      title: 'Contacts'
    }

    return (
      <div className='post-list-item'>
      <Card sx={{ maxWidth: 680, background: 'goldenrod' }}>
        {head.cover?
          <CardMedia
            sx={{ height: 210 }}
            image={head.cover}
            title={head.title}
          />
        : ''}
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" color="text.primary">
            {head.icon}
            {head.title}
          </Typography>

          <div style={{color: 'black'}}>
            <PageHTML pageContent={props.pageChildren}/>
          </div>

        </CardContent>
      </Card>
      </div>
    )
}

export async function getStaticProps() {
  const pageId = '04246023eca9412a9c9a3e6dc53c0190'
  const notion = new Client({ auth: process.env.NOTION_KEY })
  const responseHead = await notion.pages.retrieve({ page_id: pageId })
  const responseChildren = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 50,
  })

  return {
    props: {
      pageHead: responseHead,
      pageChildren: responseChildren.results,
      pageID: pageId
    },
    revalidate: 60
  }
}

