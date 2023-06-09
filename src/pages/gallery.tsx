import { useLayoutEffect, useState, useRef } from 'react'
const { Client } = require('@notionhq/client')
import ImageSet from '@components/ImageSet'

import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import styled from 'styled-components'

import Slider from 'react-animated-slider'
import 'react-animated-slider/build/horizontal.css'
import lang from '../locales/lang'

const ButtonStyled = styled.button<{$disabled?: boolean}>`
    cursor: pointer;
    height: 1.9rem;
    margin: 0.75rem 3px;
    padding: auto 3px;
    border: none;
    white-space: nowrap;
    &:disabled {
      color: grey;
      cursor: default;
    };
    `

export default function Gallery({results}) {
  const t = lang()
  const ref = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(1)
  const imgsets = results.filter((e) => e.properties.Photo.files.length > 0)

  useLayoutEffect(() => {
    const w = ref?.current?.offsetParent?.clientWidth ?? 381
    setColumns(~~(w/200))
    console.log('Imglist', w, ref, results)
  }, [])
  
  const getImgSet = (imgsetIndex) => {
    return (imgsets[imgsetIndex].properties.Photo.files.map((e)=> { return(
                                                        {img: e.file.url, 
                                                        title: e.name}
            )}))
  }

  const getTitle = (e, locale) => {
    const title = e.properties['Name_'+locale]?.rich_text[0]?.plain_text ?? 
                  e.properties.Name.title[0]?.plain_text ?? 
                  'Unnamed image set';
    return title
  }

  return (
    <div className='gall' ref={ref}>
      {imgsets.map((e, i)=>(
        <div key={i}>
          <div className='gall-header'>
            {getTitle(e, t.locale)}
          </div>

          <ImageSet imgset={getImgSet(i)} columns={columns} />

          {/*<div className='gall-divider'>Variant with slider</div>
              <Slider direction="horizontal" autoplay={4000}>
                {imgsets[imgsetIndex]?.properties.Photo.files.map((img, index) =>
                  <div key={index} className='gall-carousel'>
                  </div>)}
              </Slider> */}
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  const notion = new Client({ auth: process.env.NOTION_KEY})
  const databaseId = process.env.NOTION_DB_PHOTOS_ID
  const response = await notion.databases.query({
    database_id: databaseId,
  })
  return {
    props: {
      results: response.results
      }
  }
}


