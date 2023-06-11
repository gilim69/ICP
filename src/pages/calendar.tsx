//Events page
import React from 'react'
import { useRouter } from 'next/router'
const { Client } = require('@notionhq/client')
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from '@fullcalendar/list'
import lang from '../locales/lang'
import Event from '@components/Event'
import BlockHTML from '@components/BlockHTML'


export default function Calendar({eventsData}) {
  let view = 'dayGridMonth'
  const [eventProps, setEventProps] = React.useState({})
  const [viewEvent, setViewEvent] = React.useState(false)

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
//      url: '/events/' + e.id
    }
    return ret 
  }

  const getImgArray = (ev) => {
    let imgArray: any[] = []
    let i = 0
    while (ev.Images.files[i]) {
      imgArray.push(ev.Images.files[i++].file?.url)
    }
    return imgArray
  }
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

  const events = localeData.map((e) => setEvent(e))

  const eventClick = (info) => {
    const ev = eventsData.filter((e)=>e.id===info.event.id)[0].properties
    const eventData={
      id: info.event.id,
      Images: getImgArray(ev),
      Name: ev.Name.title[0]? <BlockHTML blockData={ev.Name}/> : 'UNDEFINED EVENT!',
      Status: ev.Status.select?.name ?? 'Undefined',
      Date: <BlockHTML blockData={ev.Date}/>,
      Time: ev.Time.rich_text[0]? <BlockHTML blockData={ev.Time}/>: null,
      Location: ev.Location.rich_text[0]? <BlockHTML blockData={ev.Location}/>: null,
      Description: ev.Description.rich_text[0]? <BlockHTML blockData={ev.Description}/>: null,
      Contacts: ev.Contacts.rich_text[0]? <BlockHTML blockData={ev.Contacts}/>: null,
      Price: ev.Price.rich_text[0]? <BlockHTML blockData={ev.Price}/>: null,
      Map: getMapUrl(ev.Map.url),
      ImgUrl: ev.Images.files[0].file?.url
    }
    setEventProps(eventData)
    setViewEvent(true)
    console.log(eventsData[3], eventData)
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
          eventTextColor='black'
          firstDay={t.locale!=='en'? 1 : 0}
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
      {viewEvent? 
        <Event eventData={eventProps} locale={t.locale} onClick={()=>setViewEvent(false)}/>
        : null 
      }
    </>
  )
}

//data of all events for calendar
export async function getServerSideProps() {
  const notion = new Client({ auth: process.env.NOTION_KEY})
  const databaseId = process.env.NOTION_DB_EVENTS_ID
  const response = await notion.databases.query({
    database_id: databaseId
  })
  return {
    props: {
      eventsData: response.results
      }
  }
}


