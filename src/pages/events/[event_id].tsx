import * as React from 'react'
import { useEffect } from 'react'
import Link from 'next/link'
import EventImageList from '@/components/EventImageList'
import Map from '@/components/Map'
import BlockHTML from '@/components/BlockHTML'
import Tooltip from '@mui/material/Tooltip'
const { Client } = require('@notionhq/client')

export default function EventPage({eventData}) {
  useEffect(()=>{
    console.log('Event Data:', eventData)
  })
   
  // parsing url of google-map
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
                          <div className='event-header-button'>
                            <Link  
                              href={{
                              pathname: '/calendar',
                              //    query: { view: eventData.View},
                            }}>
                              <Tooltip title='Go back' sx={{ backgroundColor: 'goldenrod', color: 'black'}}>
                                <span>&#9668;&nbsp;BACK</span>
                              </Tooltip>
                            </Link>
                          </div>
                        <div className='event-header-title'><BlockHTML blockData={eventData.Name}/></div>
                        <div className={`${eventData.Status.select?.name ?? 'Undefined'} event-header-status`}>
                            Status:
                            <div>{eventData.Status.select?.name ?? 'Undefined'}</div>
                        </div>
                    </header>

                    {imgArray? 
                        <div className='event-imgblock'>
                            <EventImageList ImageArray={imgArray}/>
                        </div>
                    :''}

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
                        </div>
                    : '' }

                    <Link  href={{
                            pathname: '/calendar',
                          //  query: { view: p.View},
                        }}>
                          <Tooltip title='Go back' sx={{ backgroundColor: 'goldenrod', color: 'black'}}>
                              <span>&#9668;&nbsp;BACK</span>
                          </Tooltip>
                    </Link>
                </div>
        </>
    )
}

// event data from DB
export async function getStaticProps(context) {
    const notion = new Client({ auth: process.env.NOTION_KEY})
    const databaseId = process.env.NOTION_DB_EVENTS_ID
    const response = await notion.databases.query({
      database_id: databaseId
    })

    const id = context.params.event_id
    let data = response.results.find((e)=>e.id===id) ?? null

    return {
      props: {
        eventData: data.properties
        },
        revalidate: 60
    }
  }
  
  //list of paths for event slug
  export async function getStaticPaths() {
    const notion = new Client({ auth: process.env.NOTION_KEY})
    const databaseId = process.env.NOTION_DB_EVENTS_ID
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        or: [
          {
            property: 'Language',
            select: {
            equals: 'English',
            },
          }
        ],
      }
    })
  
    const paths = response.results.map((event) => ({
      params: { event_id: event.id }
    }))
  
    return {
      paths,
      fallback: 'blocking'
    }
  }