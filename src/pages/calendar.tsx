//Events page
import React from 'react'
import { useRouter } from 'next/router'
const { Client } = require('@notionhq/client')
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from '@fullcalendar/list'
import lang from '../locales/lang'

export default function Calendar({eventsData}) {
  let view = 'dayGridMonth'

  const t = lang()
  const localeData = eventsData.filter((e)=>
  e.properties.Language.multi_select.some(item => item.name.includes(t.locale))
)
  const router = useRouter()
  
  const setEvent = (e) => {
    const ret = {
      id: e.id,
      title: e.properties.Name.title[0]?.plain_text ?? 'UNDEFINED NAME OF EVENT!',
      start: e.properties.Date.date?.start ?? 'Undefined Date!',
      url: '/events/' + e.id
    }
    return ret 
  }

  const events = localeData.map((e) => setEvent(e))

  const eventClick = (info) => {
    router.push({
      pathname: '/post/[event_id]',
      query: { event_id: info.event.id },
    }, undefined, { locale: t.locale })
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
          expandRows={true}
          aspectRatio={3}
          handleWindowResize
          stickyHeaderDates
          locale={t.locale}
          eventClick = {eventClick}
          headerToolbar={
            {left: 'prev,next',
            center: 'title',
            right: 'dayGridWeek,dayGridMonth,listMonth'}
          }
          views={{
            dayGridWeek: { buttonText:t.Calendar.week},
            dayGridMonth: { buttonText:t.Calendar.month},
            listMonth: { buttonText: t.Calendar.events_by_list },
          }}
          selectable
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
    database_id: databaseId
  })
  return {
    props: {
      eventsData: response.results
      },
      revalidate: 60
  }
}


