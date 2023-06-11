import * as React from 'react'
import { useLayoutEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import EventImageList from '@components/EventImageList'
import Tooltip from '@mui/material/Tooltip'
import styled from 'styled-components';
import lang from '../locales/lang'
import ImageViewer from '@components/ImageViewer'
import Map from '@components/Map'

export const ViewerImage = styled.div<{$width, $height, $float}>`
    position: relative;
    width: ${props => props.$width || '90vw'};
    height: ${props => props.$height || '69vw'};
    float: ${props => props.$float || 'none'};
    background: 'grey';
    cursor: pointer;
    overflow: auto;
    margin: 1rem;
`

export default function Event({eventData, locale, onClick}) {
    const ref = useRef<HTMLDivElement>(null)
    const t = lang()
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [float, setFloat] = useState('none')
    const [ratio, setRatio] = useState(1.5)
    const [viewOpen, setViewOpen] = useState(false)
    const [viewUrl, setViewUrl] = useState('')

    const imgRatio = (e) => {
        const w = e.target.naturalWidth ?? 100
        const h = e.target.naturalHeight ?? 100
        setRatio(w/h)
    }

    useLayoutEffect(() => {
        const w = ref.current?.offsetWidth ?? 300
        if (w>468) {
            setWidth(String(~~(w/2))+'px')
            setHeight(String(~~(w/2/ratio))+'px')
            setFloat('right')
        } else {
            setWidth(String(~~(w))+'px')
            setHeight(String(~~(w/ratio))+'px')
            setFloat('none')            
        }
    }, [ratio])

    // properties (titles) of event from DB:
    const eventProperties = ['Date', 'Time', 'Location', 'Description', 'Contacts', 'Price']

  return (
        <>
            <div className='event-record' ref={ref}>

                <div className='event-header'>
                        <div className={`${eventData.Status} event-header-status`}>
                            Status:
                            <div>{eventData.Status}</div>
                        </div>
                        <div className='event-header-title'>{eventData.Name}</div>
                        <div className='event-header-button' onClick={onClick}>&#10006;</div>
                </div>

                <div className='event-data'>
                    {eventData.Images[0]? 
                        <ViewerImage
                            $width={width}
                            $height={height}
                            $float={float}
                            onClick={()=>{setViewUrl(eventData.Images[0]); setViewOpen(true)}}
                        >
                            <Image 
                                src={eventData.Images[0]} 
                                layout='fill' 
                                objectFit='contain' 
                                sizes="(max-width: 768px) 100vw, (max-width: 1000px) 50vw, 33vw"
                                alt='event image'
                                onLoad={(e)=>imgRatio(e)}
                                placeholder="blur"
                                blurDataURL = {t.files.image_loading}
                            />
                        </ViewerImage>
                    :''}

                    {eventProperties.map((e,i)=> {
                    return( eventData[e] ?
                        <div key={eventData[e].id} className='event-element'>
                            <div className='event-head'>
                                {t.Event[e]}: 
                            </div>
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

                {viewOpen && <ImageViewer url={viewUrl} onClick={()=>setViewOpen(false)}/> }

            </div>
        </>
    )
}