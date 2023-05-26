import * as React from 'react';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image';
import Layout from '@/components/layout'
import EventImageList from '@/components/eventimagelist'
import Map from '@/components/map'
import BlockHTML from '@/components/blockhtml'
import { dbRecordData } from '@/pages/api/getdata'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Button from '@mui/material/Button'
const { Client } = require('@notionhq/client')

export default function Eventpage({p}) {
  
  const getMapUrl = (m)=> {
    if (m) {
        const start = m.indexOf('https://')
        if (start+1) {
            const end = m.indexOf('" ')
                return end? m.slice(start, end) : null
            }
        }
    return null
  }

  useEffect(()=>{
    console.log('Event ID:', p)
  })

  //  const router = useRouter()
 //   const id  = router.query

    const eventData = ['Date', 'Time', 'Location', 'Description', 'Contact', 'Price']

    let imgArray: any[] = []
    let i = 0
    while (p.photo.files[i]) {
      imgArray.push(p.photo.files[i++].file.url)
    }

    return (
        <>
                <div className='event-record'>
                    <header className='event-header'>
                        <Link  href={{
                            pathname: '/calendar',
                        //    query: { view: p.View},
                        }}>
                            <ArrowBackIcon />
                        </Link>
                        <div className='event-title'><BlockHTML bl={p.name}/></div>
                        <div className={`${p.status.select? p.status.select.name : 'Undefined'} event-status`}>
                            Status:
                            <div>{p.status.select? p.status.select.name : 'Undefined'}</div>
                        </div>
                    </header>

                    {imgArray? 
                        <div className='event-imgblock'>
                            <EventImageList ImageArray={imgArray}/>
                        </div>
                    :''}
                   
                    {eventData.map((e) => ( p[e.toLowerCase()]?
                        <div key={e} className='event-element'>
                            <div className='event-head'>{e}: </div>
                            <BlockHTML bl={p[e.toLowerCase()]}/>
                        </div>
                    :'' ))}

                    {p.MapUrl?
                        <div className='event-element'>
                            <Map title="Map" url={getMapUrl(p.map.url)} />
                        </div>
                    : '' }

                    <Link  href={{
                            pathname: '/calendar',
                          //  query: { view: p.View},
                        }}>
                            <Button startIcon={<ArrowBackIcon />} size="small">Go Back</Button>
                    </Link>
                </div>
        </>
    )
}

export async function getStaticProps(context) {
    const notion = new Client({ auth: process.env.NOTION_KEY})
    const databaseId = process.env.NOTION_DB_EVENTS_ID
    const response = await notion.databases.query({
      database_id: databaseId
    })

    const id = context.params.event_id
    let data = response.results.find((ev)=>ev.id===id)
    if (!data) {data = null}

    return {
      props: {
        p: data.properties
        },
        revalidate: 60
    }
  }
  
  export async function getStaticPaths() {
    const notion = new Client({ auth: process.env.NOTION_KEY})
    const databaseId = process.env.NOTION_DB_EVENTS_ID
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        or: [
          {
            property: 'language',
            select: {
            equals: 'English',
            },
          }
        ],
      }
    });
  
    const paths = response.results.map((event) => ({
      params: { event_id: event.id }
    }))
  
    return {
      paths,
      fallback: 'blocking'
    }
  }