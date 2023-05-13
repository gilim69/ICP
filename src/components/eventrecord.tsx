import * as React from 'react';
import {useState, useEffect} from "react"
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import EventImageList from '@/components/eventimagelist'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  margin: '3vm',
  color: 'black',
}));

export default function EventRecord(props) {
    const e=props.eventRec
    const p = {
        Id: e.id,
        Name: e.properties.name.title[0]? e.properties.name.title[0].plain_text : 'UNDEFINED NAME OF EVENT!',
        Date: e.properties.date.date? e.properties.date.date.start : 'Undefined Date!',
        Time: e.properties.time.rich_text[0]? e.properties.time.rich_text[0].text.content : 'Undefined Time!',
        Location: e.properties.location.rich_text[0]? e.properties.location.rich_text[0].text.content : 'Undefined Location',
        Status: e.properties.status.select? e.properties.status.select.name : 'Undefined',
        Description: e.properties.description.rich_text[0]? e.properties.description.rich_text[0].text.content : 'About the event...',
        Img: e.properties.photo.files[0]? e.properties.photo.files : []
    }

    return (
/*        <>
        <Box sx={{
            flexGrow: 1,
            margin: '10px', 
            }}>
        <hr></hr>
        <hr></hr>
        <Grid container spacing={1} rowSpacing={1} style={{ color: 'black', backgroundColor: 'lightskyblue' }}>
            <Grid item xs={12}>
                <Item><div className='event-title'>{p.Name}</div></Item>
            </Grid>
            <Grid item xs={8} rowSpacing={2}>
                <Grid item xs={12}>
                    <Item>
                        <div className='event-head'>Date:</div>
                        <div className='event-value'>{p.Date}</div>
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                        <div className='event-head'>Time:</div>
                        <div className='event-value'>{p.Time}</div>
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                        <div className='event-head'>Location:</div>
                        <div className='event-value'>{p.Location}</div>
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                        <div className='event-head'>Status:</div>
                        <div className='event-value'>{p.Status}</div>
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                        <div className='event-head'>Description:</div>
                        <div className='event-value'>{p.Description}</div>
                    </Item>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Item> 
                        <EventImageList ImageArray={p.Img}/>
                </Item>
            </Grid>
        </Grid>
        </Box> 
        </> */
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
                    <EventImageList ImageArray={p.Img} />
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

            </div>
        </>
    );
}