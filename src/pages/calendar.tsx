//Events page
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
<<<<<<< HEAD
import Layout from '@/components/layout'
=======
import Layout from '@/components/Layout'
>>>>>>> 92377ee (Black theme)
const { Client } = require('@notionhq/client')
import EventNoteIcon from '@mui/icons-material/EventNote';

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from '@fullcalendar/list';

<<<<<<< HEAD
export default function Home({results}) {
=======
export default function Calendar({eventsData}) {
>>>>>>> 92377ee (Black theme)
let view = 'dayGridMonth'
const router = useRouter()
const param = router.query
if (param.view==='listMonth') {
  view='listMonth'
}

<<<<<<< HEAD
  useEffect(()=>{
    console.log('Results:', results)
  })

  const ev = (e) => {
    const ret = {
      id: e.id,
      title: e.properties.name.title[0]? e.properties.name.title[0].plain_text : 'UNDEFINED NAME OF EVENT!',
      start: e.properties.date.date? e.properties.date.date.start : 'Undefined Date!',
=======
/*  useEffect(()=>{
    console.log('Results:', eventsData)
  })*/

  const setEvent = (e) => {
    const ret = {
      id: e.id,
      title: e.properties.Name.title[0]?.plain_text ?? 'UNDEFINED NAME OF EVENT!',
      start: e.properties.Date.date?.start ?? 'Undefined Date!',
>>>>>>> 92377ee (Black theme)
      url: '/events/'+e.id
    }
    return ret 
  }

<<<<<<< HEAD
  const events = results.map((e) => ev(e))
=======
  const events = eventsData.map((e) => setEvent(e))
>>>>>>> 92377ee (Black theme)

  function eventToolTip(info){
    
  }

  return (
    <>  
      <div className='event-calendar'>
        <FullCalendar 
          plugins={[ dayGridPlugin, listPlugin, interactionPlugin]}    
          initialView={view}
<<<<<<< HEAD
          weekends={true}
=======
          weekends
>>>>>>> 92377ee (Black theme)
          displayEventTime={false}
          events={events}
          height='auto'
          fixedWeekCount={false}
          showNonCurrentDates={false}
<<<<<<< HEAD
          expandRows={true}
          handleWindowResize={true}
          stickyHeaderDates={true}
=======
 //         expandRows={true}
          aspectRatio={3}
          handleWindowResize
          stickyHeaderDates
>>>>>>> 92377ee (Black theme)
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
<<<<<<< HEAD
          selectable={true}
=======
          selectable
>>>>>>> 92377ee (Black theme)
 //         eventClick={handleEventClick}
        />
      </div>
    </>
  )
}

<<<<<<< HEAD
=======
//data of all events for calendar
>>>>>>> 92377ee (Black theme)
export async function getStaticProps() {
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
          select: { equals: 'English', },
        }
      ],
    },
  });
  return {
    props: {
<<<<<<< HEAD
      results: response.results
=======
      eventsData: response.results
>>>>>>> 92377ee (Black theme)
      },
      revalidate: 60
  }
}


