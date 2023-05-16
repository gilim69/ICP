import * as React from 'react';
import Image from 'next/image';
import EventImageList from '@/components/eventimagelist'
import Map from '@/components/map'

export default function EventRecord(props) {
    
    const e=props.eventRec

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

    const p = {
        Id: e.id,
        Name: e.properties.name.title[0]? e.properties.name.title[0].plain_text : 'UNDEFINED NAME OF EVENT!',
        Date: e.properties.date.date? e.properties.date.date.start : 'Undefined Date!',
        Time: e.properties.time.rich_text[0]? e.properties.time.rich_text[0].text.content : 'Undefined Time!',
        Location: e.properties.location.rich_text[0]? e.properties.location.rich_text[0].text.content : 'Undefined Location',
        Status: e.properties.status.select? e.properties.status.select.name : 'Undefined',
        Description: e.properties.description.rich_text[0]? e.properties.description.rich_text[0].text.content : 'About the event...',
        Img: e.properties.photo.files[0]? e.properties.photo.files : [],
        MapUrl: getMapUrl(e.properties.map.url) 
    }

    return (
        <>
            <header className='event-header'>
                <div className='event-title'>{p.Name}</div>
                <div className={`${p.Status} event-status`}>
                    Status:
                    <div>{p.Status}</div>
                </div>
            </header>
            <div className='event-record'>

                <div className='event-imgblock'>
                    {p.Img[0]? 
                    <EventImageList ImageArray={p.Img}/>
                    :''}
                </div>

                <div className='event-element'>
                    <div className='event-head'>Date:</div>
                    <div className='event-value'>{p.Date}</div>
                </div>
                <div className='event-element'>
                    <div className='event-head'>Time:</div>
                    <div className='event-value'>{p.Time}</div>
                </div>
                <div className='event-element'>
                    <div className='event-head'>Location:</div>
                    <div className='event-value'>{p.Location}</div>
                </div>
                <div className='event-element'>
                    <div className='event-head'>Description:</div>
                    <div className='event-value'>{p.Description}</div>
                </div>
                <div className='event-element'>
                    <Map title="Map" url={p.MapUrl} />
                </div>
            </div>
        </>
    );
};