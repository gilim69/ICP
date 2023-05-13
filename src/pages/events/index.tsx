//Events page
import Link from 'next/link'
import { useEffect } from 'react'
import Layout from '@/components/layout'
import Image from 'next/image'
const { Client } = require('@notionhq/client')
import EventRecord from '@/components/eventrecord'

export default function Home({results}) {

  useEffect(()=>{
    console.log(results)
  })

/*  const queryDb = () => {
      const ret = results.map((e) => {
        function gP(property) {
          switch (property) {
            case 'Id':
              return e.id
            case 'Name':
              return e.properties.name.title[0]? e.properties.name.title[0].plain_text : 'UNDEFINED NAME OF EVENT!'
            case 'Date':
              return e.properties.date.date? e.properties.date.date.start : 'Undefined Date!'
            case 'Time':
              return e.properties.time.rich_text[0]? e.properties.time.rich_text[0].text.content : 'Undefined Time!'
            case 'Location':
              return e.properties.location.rich_text[0]? e.properties.location.rich_text[0].text.content : 'Undefined Location'
            case 'Status':
              return e.properties.status.select? e.properties.status.select.name : 'Undefined'
            case 'Description':
              return e.properties.description.rich_text[0]? e.properties.description.rich_text[0].text.content : 'About the event...'
            case 'Imgsrc':
              return e.properties.photo.files[0]? e.properties.photo.files[0].file.url : '/no_image.jpg'
          }
        }
        return (
        <div key={gP('Id')} className='events-link'>
          <Link href={'/events/'+gP('Id')} className='event-link'>
            <h2>{gP('Name')}</h2>
            <div className='events-img'>
                <Image
                      src={gP('Imgsrc')}
                      alt={gP('Name')}
                      className="event-picture"
                      width={254}
                      height={180}
                />
            </div>
            <div className='events-text'>
              <p><span>Date:</span> {gP('Date')}</p>
              <p><span>Time:</span> {gP('Time')}</p>
              <p><span>Location:</span> {gP('Location')}</p>
              <p><span>Status:</span> {gP('Status')}</p>
              <p><span>Description:</span> {gP('Description')}</p>       
            </div>
          </Link>
        </div>
        )
  })
    return <div> {ret} </div>
  }*/
  return (
    <>  
      <Layout>  
        <div className='event-list'>
          {results.map((eventData) => (
            <EventRecord eventRec={eventData} />
          ))}
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_KEY})
  const databaseId = process.env.NOTION_DATABASE_ID
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


