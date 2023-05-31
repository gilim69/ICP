//Events page
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
const { Client } = require('@notionhq/client')
import EventNoteIcon from '@mui/icons-material/EventNote';

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from '@fullcalendar/list';

export default function Calendar({eventsData}) {
let view = 'dayGridMonth'
const router = useRouter()
const param = router.query
if (param.view==='listMonth') {
  view='listMonth'
}

/*  useEffect(()=>{
    console.log('Results:', eventsData)
  })*/

  const setEvent = (e) => {
    const ret = {
      id: e.id,
      title: e.properties.Name.title[0]?.plain_text ?? 'UNDEFINED NAME OF EVENT!',
      start: e.properties.Date.date?.start ?? 'Undefined Date!',
      url: '/events/'+e.id
    }
    return ret 
  }

  const events = eventsData.map((e) => setEvent(e))

  function eventToolTip(info){
    
  }

  return (
    <>  
      <div className='event-calendar'>
        <FullCalendar 
          plugins={[ dayGridPlugin, listPlugin, interactionPlugin]}    
          initialView={view}
          weekends
          displayEventTime={false}
          events={events}
          height='auto'
          fixedWeekCount={false}
          showNonCurrentDates={false}
 //         expandRows={true}
          aspectRatio={3}
          handleWindowResize
          stickyHeaderDates
          eventMouseEnter={eventToolTip}
          headerToolbar={
            {left: 'prev,next',
            center: 'title',
            right: 'dayGridWeek,dayGridMonth,listMonth'}
          }
          views={{
            dayGridWeek: { buttonText:'WEEK'},
            dayGridMonth: { buttonText:'MONTH'},
            listMonth: { buttonText: 'Events by list' },
          }}
          selectable
 //         eventClick={handleEventClick}
        />
      </div>
    </>
  )
}

//data of all events for calendar
export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_KEY})
  const databaseId = process.env.NOTION_DB_EVENTS_ID
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [
        {
          property: 'Language',
          select: { equals: 'English', },
        }
      ],
    },
  });
  return {
    props: {
      eventsData: response.results
      },
      revalidate: 60
  }
}


