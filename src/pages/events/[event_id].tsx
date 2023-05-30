import * as React from 'react';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image';
<<<<<<< HEAD
import Layout from '@/components/layout'
import EventImageList from '@/components/eventimagelist'
import Map from '@/components/map'
import BlockHTML from '@/components/blockhtml'
import { dbRecordData } from '@/pages/api/getdata'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Button from '@mui/material/Button'
const { Client } = require('@notionhq/client')

export default function Eventpage({p}) {
  
=======
import Layout from '@/components/Layout'
import EventImageList from '@/components/EventImageList'
import Map from '@/components/Map'
import BlockHTML from '@/components/BlockHTML'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
const { Client } = require('@notionhq/client')

export default function EventPage({eventData}) {
  useEffect(()=>{
    console.log('Event Data:', eventData)
  })
   
  // parsing url of google-map
>>>>>>> 92377ee (Black theme)
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

<<<<<<< HEAD
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
=======
  // properties (titles) of event from DB:
  const eventProperties = ['Date', 'Time', 'Location', 'Description', 'Contacts', 'Price']

  // image(s) of event
  let imgArray: any[] = []
  let i = 0
  while (eventData.Images.files[i]) {
    imgArray.push(eventData.Images.files[i++].file?.url)
  }

  return (
        <>
                <div className='event-record'>
                    <header className='event-header'>
                        <Tooltip title='Go back'>
                          <div className='event-header-button'>
                            <Link  href={{
                                pathname: '/calendar',
                            //    query: { view: eventData.View},
                            }}>
                                <ArrowBackIcon />
                            </Link>
                          </div>
                        </Tooltip>
                        <div className='event-header-title'><BlockHTML blockData={eventData.Name}/></div>
                        <div className={`${eventData.Status.select?.name ?? 'Undefined'} event-header-status`}>
                            Status:
                            <div>{eventData.Status.select?.name ?? 'Undefined'}</div>
>>>>>>> 92377ee (Black theme)
                        </div>
                    </header>

                    {imgArray? 
                        <div className='event-imgblock'>
                            <EventImageList ImageArray={imgArray}/>
                        </div>
                    :''}
<<<<<<< HEAD
                   
                    {eventData.map((e) => ( p[e.toLowerCase()]?
                        <div key={e} className='event-element'>
                            <div className='event-head'>{e}: </div>
                            <BlockHTML bl={p[e.toLowerCase()]}/>
                        </div>
                    :'' ))}

                    {p.MapUrl?
                        <div className='event-element'>
                            <Map title="Map" url={getMapUrl(p.map.url)} />
=======

                    {eventProperties.map((e,i)=> {
                    return( eventData[e].id && eventData[e][eventData[e].type]?.length ?
                        <div key={eventData[e].id} className='event-element'>
                            <div className='event-head'>{e}: </div>
                            <div className='event-value'>
                              <BlockHTML blockData={eventData[e]}/>
                            </div>
                        </div>
                      :<div/>)
                    })}

                    {eventData.Map.url?
                        <div className='event-element'>
                            <Map title="Map" url={getMapUrl(eventData.Map.url)} />
>>>>>>> 92377ee (Black theme)
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

<<<<<<< HEAD
=======
// event data from DB
>>>>>>> 92377ee (Black theme)
export async function getStaticProps(context) {
    const notion = new Client({ auth: process.env.NOTION_KEY})
    const databaseId = process.env.NOTION_DB_EVENTS_ID
    const response = await notion.databases.query({
      database_id: databaseId
    })

    const id = context.params.event_id
<<<<<<< HEAD
    let data = response.results.find((ev)=>ev.id===id)
    if (!data) {data = null}

    return {
      props: {
        p: data.properties
=======
    let data = response.results.find((e)=>e.id===id) ?? null

    return {
      props: {
        eventData: data.properties
>>>>>>> 92377ee (Black theme)
        },
        revalidate: 60
    }
  }
  
<<<<<<< HEAD
=======
  //list of paths for event slug
>>>>>>> 92377ee (Black theme)
  export async function getStaticPaths() {
    const notion = new Client({ auth: process.env.NOTION_KEY})
    const databaseId = process.env.NOTION_DB_EVENTS_ID
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        or: [
          {
<<<<<<< HEAD
            property: 'language',
=======
            property: 'Language',
>>>>>>> 92377ee (Black theme)
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