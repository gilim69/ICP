import * as React from 'react'
import { useEffect } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import EventImageList from '@components/EventImageList'
import Map from '@components/Map'
import Tooltip from '@mui/material/Tooltip'
import lang from '../locales/lang'

export default function Event({eventData, locale, onClick}) {
  const router = useRouter()
  const t = lang()

  // properties (titles) of event from DB:
  const eventProperties = ['Date', 'Time', 'Location', 'Description', 'Contacts', 'Price']

  return (
        <>
            <div className='event-record'>

                <div className='event-header'>
                        <div className={`${eventData.Status} event-header-status`}>
                            Status:
                            <div>{eventData.Status}</div>
                        </div>
                        <div className='event-header-title'>{eventData.Name}</div>
                        <div className='event-header-button' onClick={onClick}>&#10006;</div>
                </div>

                <div className='event-data'>
                    {eventData.Images? 
                        <div className='event-imgblock'>
                            <EventImageList ImageArray={eventData.Images}/>
                        </div>
                    :''}

                    {eventProperties.map((e,i)=> {
                    return( eventData[e] ?
                        <div key={eventData[e].id} className='event-element'>
                            <div className='event-head'>{t.Event[e]}: </div>
                            <div className='event-value'>
                              {eventData[e]}
                            </div>
                        </div>
                      :<div/>)
                    })}

                    {eventData.Map?
                        <div className='event-element'>
                            <Map title="Map" url={eventData.Map} />
                        </div>
                    : '' }



                    <div style={{margin: '4rem 0 0 1rem'}}>
                      <Link  href={{
                              pathname: '/calendar',
                            //  query: { view: p.View},
                          }}>
                            <Tooltip title='Go back' sx={{ backgroundColor: 'goldenrod', color: 'black'}}>
                                <span>&#9668;&nbsp;{t.Navigation.back}</span>
                            </Tooltip>
                      </Link>
                    </div>
                </div>

            </div>
        </>
    )
}