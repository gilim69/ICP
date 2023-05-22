//Events page
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import Image from 'next/image'
const { Client } = require('@notionhq/client')
import EventNoteIcon from '@mui/icons-material/EventNote';

import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from '@fullcalendar/list';

export default function Home({results}) {
let view = 'dayGridMonth'
const router = useRouter()
const param = router.query
if (param.view==='listMonth') {
  view='listMonth'
}

  useEffect(()=>{
    console.log('Results:', results)
  })

  const ev = (e) => {
    const ret = {
      id: e.id,
      title: e.properties.name.title[0]? e.properties.name.title[0].plain_text : 'UNDEFINED NAME OF EVENT!',
      start: e.properties.date.date? e.properties.date.date.start : 'Undefined Date!'};
    return ret 
  }

  const events = results.map((e) => ev(e))

  const handleEventClick=(clickInfo) => {
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

    const getImgArray = (e: any) => {
      let ret: any[] = []
      let i = 0
      while (e.properties.photo.files[i]) {
        ret.push(e.properties.photo.files[i++].file.url)
      }
      return ret
    }

    const id = clickInfo.event.id
    const e = results.find((ev)=>ev.id===id)
    if (!e) { return }
    const props = {
      Id: e.id,
      Name: e.properties.name.title[0]? e.properties.name.title[0].plain_text : 'UNDEFINED NAME OF EVENT!',
      Date: e.properties.date.date? e.properties.date.date.start : 'Undefined Date!',
      Time: e.properties.time.rich_text[0]? e.properties.time.rich_text[0].text.content : 'Undefined Time!',
      Location: e.properties.location.rich_text[0]? e.properties.location.rich_text[0].text.content : 'Undefined Location',
      Status: e.properties.status.select? e.properties.status.select.name : 'Undefined',
      Description: e.properties.description.rich_text[0]? e.properties.description.rich_text[0].text.content : 'About the event...',
      Img: getImgArray(e),
      MapUrl: getMapUrl(e.properties.map.url), 
      View: clickInfo.view.type
    }
 //   console.log('Props Calendar:', props)
    const idPath = '/events/event_'+id
    router.push(
      { 
        pathname: idPath, 
        query:  props  
      })
  }

  return (
    <>  

      <div>
        <FullCalendar 
          plugins={[ dayGridPlugin, listPlugin, interactionPlugin]}    
          initialView={view}
          weekends={false}
          displayEventTime={true}
          events={events}
          headerToolbar={
            {left: 'title,prev,next',
            center: '',
            right: 'dayGridWeek,dayGridMonth,listMonth'}
          }
          views={{
            dayGridWeek: { buttonText:'WEEK'},
            dayGridMonth: { buttonText:'MONTH'},
            listMonth: { buttonText: 'Events by list' },
          }}
          selectable={true}
          eventClick={handleEventClick}
        />
      </div>

    </>
  )
}

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_KEY})
  const databaseId = process.env.NOTION_DB_EVENTS_ID
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: 'date',
        direction: 'ascending',
      }
    ],
  });
  return {
    props: {
      results: response.results
      }
  }
}


