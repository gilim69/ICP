import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import * as React from 'react';
import Image from 'next/image';
import EventImageList from '@/components/eventimagelist'
import Map from '@/components/map'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Link from 'next/link'

export default function Eventpage() {
    const router = useRouter()
    const p  = router.query
 //   console.log('Props ID:', p)

    return (
        <>

                <div className='event-record'>
                    <header className='event-header'>
                        <Link  href={{
                            pathname: '/calendar',
                            query: { view: p.View},
                        }}>
                            <ArrowBackIcon />
                        </Link>
                        <div className='event-title'>{p.Name}</div>
                        <div className={`${p.Status} event-status`}>
                            Status:
                            <div>{p.Status}</div>
                        </div>
                    </header>

                    <div className='event-imgblock'>
                        {p.Img? 
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
    )
}
