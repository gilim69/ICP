//Events page
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Layout from '@/components/layout'
import Image from 'next/image'
const { Client } = require('@notionhq/client')
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventNoteIcon from '@mui/icons-material/EventNote';

import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from '@fullcalendar/list';

export default function Home({results}) {
  //const [view, setView] = useState('listMonth')
const view = 'listMonth'

  useEffect(()=>{
    console.log(events)
  })

  const ev = (e) => {
    const ret = {id: e.id,
      title: e.properties.name.title[0]? e.properties.name.title[0].plain_text : 'UNDEFINED NAME OF EVENT!',
     start: e.properties.date.date? e.properties.date.date.start : 'Undefined Date!'};
    return ret 
  }

  const events = results.map(e => ev(e))

  const handleDateClick = (arg) => { // bind with an arrow function
   // setView('listWeek')
  }

  return (
    <>  
      <Layout>  
        <div className='title'>
          <Link href='/calendar'>
            <Button variant="text" startIcon={<CalendarMonthIcon/>}>Events in Calendar</Button>
          </Link>
        </div>

        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin, listPlugin ]}

          initialView={view}
          weekends={false}
          displayEventTime={true}
          events={events}
        />
      </Layout>
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


