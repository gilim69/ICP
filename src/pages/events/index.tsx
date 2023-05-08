//Events page
import Link from 'next/link'
import {useState, useEffect} from "react"
import Layout from '../../components/layout'
import Image from 'next/image'
const { Client } = require('@notionhq/client')

export default function Home({results}) {

  useEffect(()=>{
    console.log(results)
  })

  const queryDb = () => {
    let ret = []
    results.forEach((event) => {
      ret.push(
        <div className='events-link'>
          <Link href={'/events/'+event.id} className='event-link'>
            <h2>{event.properties.name.title[0].plain_text}</h2>
            <div className='events-img'>
                <Image
                      src={event.properties.photo.files[0].file.url}
                      alt={event.properties.name.title[0].plain_text}
                      className="event-picture"
                      width={200}
                      height={180}
                />
            </div>
            <div className='events-text'>
              <p><span>Date:</span> {event.properties.date.date.start}</p>
              <p><span>Time:</span> {event.properties.time.rich_text[0].text.content}</p>
              <p><span>Location:</span> {event.properties.location.rich_text[0].text.content}</p>
              <p><span>Status:</span> {event.properties.status.select.name}</p>
              <p><span>Description:</span> {event.properties.description.rich_text[0].text.content}</p>       
            </div>
          </Link>
        </div>
      )
    })
    return ret
  }
  return <div>  <Layout/> {queryDb()}</div>
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
      results: response.results,
      }
  }
}



