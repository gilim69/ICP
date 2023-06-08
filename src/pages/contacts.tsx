import PageHTML from '@components/PageHTML'
//import LoginIcon from '@mui/icons-material/Login'  //version with auth
import { useEffect } from 'react'
const { Client } = require('@notionhq/client')
import lang from '../locales/lang'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { ResourceStore } from 'i18next'

export default function Contacts(props) {
  const t = lang()
  useEffect(()=>{
      console.log('Contacts:', props)
    })
    const e = props.pageHead
    const headInf = {
      cover: e.cover? e.cover[e.cover.type]?.url : null,
      icon: e.icon? e.icon.emoji || <img src={e.icon.external?.url} height='30'/> : null,
      title: t.Contacts.contacts
    }
console.log('head ', headInf.title)
    return (
      <div className='post-list-item'>
      <Card sx={{ maxWidth: 680, background: 'goldenrod' }}>
        {headInf.cover?
          <CardMedia
            sx={{ height: 210 }}
            image={headInf.cover}
            title={headInf.title}
          />
        : ''}
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" color="black">
            {headInf.icon}
            {headInf.title}
          </Typography>

          <div style={{color: 'black'}}>
            <PageHTML pageContent={props.pageChildren}/>
          </div>

        </CardContent>
      </Card>
      </div>
    )
}

export async function getStaticProps(params) {
  let pageId = params.locale==='es'? '865209aad6574775a5aa0836de25a493' :
    params.locale==='ru'? '688e4b7017e14fb695662963cc2bdde1' : '04246023eca9412a9c9a3e6dc53c0190'
 
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
      pageID: pageId,
      params: params
    },
    revalidate: 60
  }
}

