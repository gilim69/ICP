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
const ButtonPrevNext = ({disabled, text, onClick}) => { return (
  <ButtonStyled
      disabled={disabled}
      onClick={onClick}
   >
      {text}     
  </ButtonStyled>)}

export default function Gallery({results}) {

//popup list with titles of image sets in gallery
  const SelectImageset = () => {
        const handleChange = (event: SelectChangeEvent) => {
          setImgsetIndex(Number(event.target.value))
        } 
        return (
          <>
                <FormControl 
                  sx={{ mb: 8, height: 48, width: 9/10, minWidth: 280, 
                  background: 'none' }}
                >
                  <Select
                  sx={{color: 'goldenrod', border: 'none'}}
                    value={imgsetIndex.toString()}
                    onChange={handleChange}
                  >
                    {imgsets.map((e, i) => (
                      <MenuItem 
                        key={e.id} 
                        value={i} 
                        sx={{color: 'black'}}
                      >
                        {e.properties.Name.title[0].plain_text}
                      </MenuItem>
                  ))}
                  </Select> 
                </FormControl>
          </>
        )
      }

//setting the index of current image set
  const prevIndex = () => {
        let ind = imgsetIndex-1
        ind = (ind<=0)? 0 : ind
        setImgsetIndex(ind)
      }
  const nextIndex = () => {
        let ind = imgsetIndex+1
        const l = imgsets.length - 1
        ind = (ind>=l)? l : ind
        setImgsetIndex(ind)
      }
//==========================================
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [columns, setColumns] = useState(0)
  const [imgsetIndex, setImgsetIndex] = useState(0)
  const imgsets = results.filter((e) => e.properties.Photo.files.length > 0)
  let imageSizeX = 100
  let imageSizeY = 100

  useLayoutEffect(() => {
    const w = ref?.current?.offsetParent?.clientWidth ?? 381
    const h = ref?.current?.offsetParent?.clientHeight ?? 328

    setWidth(w)
    setHeight(h)
    setColumns(~~(w/200))
    console.log('Imglist', w, ref, width, columns)
  }, [])

  const getImageSize = (img) => {
    imageSizeX = img.naturalWidth ?? 100
    imageSizeY = img.naturalHeight ?? 100
  }
  
  const getImgSet = (imgsetIndex) => {
    return (imgsets[imgsetIndex].properties.Photo.files.map((e)=> { return(
                                                        {img: e.file.url, 
                                                        title: e.name}
            )}))
  }

  return (
      <div className='gall' ref={ref}>
        <div className='gall-header'>
          <Button className='button'
            disabled={imgsetIndex <= 0}
            onClick={prevIndex}
          >
            {'\u25C4\u00A0PREV'}
          </Button>

          <SelectImageset />

          <Button className='button'
            disabled={imgsetIndex >= (imgsets.length - 1)}
            onClick={nextIndex}
          >
            {'NEXT\u00A0\u25BA'}
          </Button>
        </div>

        <ImageSet imgset={getImgSet(imgsetIndex)} />

 {/*     <div className='gall-divider'>Variant with slider</div>
        <Slider direction="horizontal" autoplay={4000}>
          {imgsets[imgsetIndex]?.properties.Photo.files.map((img, index) => 
            <div key={index} className='gall-carousel'>

            </div>)}
          </Slider> */}
      </div>
  )
}

export async function getStaticProps() {
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


