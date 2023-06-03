import { useLayoutEffect, useState, useRef } from 'react'
const { Client } = require('@notionhq/client')
import ImageList from '@mui/material/ImageList'
import ImageSized from '@components/ImageSized'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import CloseIcon from '@mui/icons-material/Close'

import Slider from 'react-animated-slider'
import 'react-animated-slider/build/horizontal.css'

export default function Gallery({results}) {

//popup list with titles of image sets in gallery
    function SelectImageSet() {
        const handleChange = (event: SelectChangeEvent) => {
          setImgSetIndex(Number(event.target.value))
        } 
        return (
          <>
                <FormControl 
                  sx={{ mb: 8, height: 51, width: 9/10, minWidth: 280, 
                  backgroundColor: 'goldenrod', borderRadius:2, fill: 'black' }}
                >
                  <Select
                    value={imgSetIndex.toString()}
                    onChange={handleChange}
                  >
                    {imgSets.map((e, i) => (
                      <MenuItem 
                        key={e.id} 
                        value={i} 
                        sx={{color: 'black'}}
                      >
                        {e.properties.Name.title[0].plain_text}
                      </MenuItem>
                  ))}
                  </Select>
                  <FormHelperText 
                    sx={{bgcolor: 'black', color: 'goldenrod', width: 1, m: 0 }}
                  >
                    Select the desired image set of gallery
                  </FormHelperText>
                </FormControl>
          </>
        )
      }

//show image bigger in window
      function ShowImageWindow() { 
        const handleClose = () => {
          setOpen(false)
        }
        return (
          <div>
            <Dialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <CloseIcon 
                onClick={handleClose} 
                sx={{ position: 'absolute', right: 12, fill: 'black', cursor: 'pointer'}}
              />
              <DialogContent sx={{ p: 0, pt:3, m: 0, backgroundColor: 'goldenrod'}}>
                      <ImageSized {...{url:showUrl, imgWidth: width, imgHeight: 0, alt: 'Image'}} />
              </DialogContent>
            </Dialog>
          </div>
        )
      }

//setting the index of current image set
      function setIndex(p){
        let ind = imgSetIndex+p
        const l = imgSets.length - 1
        ind = (ind<=0)? 0 : (ind>=l)? l : ind
        setImgSetIndex(ind)
      }

// handle to make visible of image show window
      const showImage = (url) => {
        setShowUrl(url)
        setOpen(true)
      }
//==========================================
  const ref = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(380)
  const [height, setHeight] = useState(380)
  const [columns, setColumns] = useState(0)
  const [showUrl, setShowUrl] = useState('')
  const [imgSetIndex, setImgSetIndex] = useState(0)
  const imgSets = results.filter((e) => e.properties.Photo.files.length > 0)
  let imgWidth = 180

  useLayoutEffect(() => {
    setWidth(ref?.current?.offsetWidth ?? 381)
    setHeight(ref?.current?.offsetHeight ?? 381)
    setColumns(~~(width/100))
    console.log('sizes ', width, height)
  }, [])

  console.log('media ', imgSets)

  return (
    <>
      <div className='gall' ref={ref}>
        <div className='gall-header'>
          <Button
            sx={{ color: 'goldenrod', mr: 1, mb: 8 }}
            onClick={() => setIndex(-1)}
            disabled={imgSetIndex <= 0}
          >
            &#9668;&nbsp;Prev
          </Button>

          <SelectImageSet />

          <Button
            sx={{ color: 'goldenrod', ml: 1, mb: 8 }}
            onClick={() => setIndex(1)}
            disabled={imgSetIndex >= (imgSets.length - 1)}
          >
            Next&nbsp;&#9658;
          </Button>
        </div>
        <ImageList variant="masonry" cols={columns} gap={3}>
          {imgSets[imgSetIndex]?.properties.Photo.files.map((img, i) => (
            <div key={i} className='gall-img' onClick={() => showImage(img.file.url)}>
              <ImageSized
                url={img.file.url}
                imgWidth={~~(width/columns)-18}
                imgHeight='0'
                alt={img.name ?? ' '}
              />
            </div>
          ))}
        </ImageList>
        <ShowImageWindow/> 

        <div className='gall-divider'>Variant with slider</div>
        <Slider direction="horizontal" autoplay={4000}>
          {imgSets[imgSetIndex]?.properties.Photo.files.map((img, index) => 
            <div key={index} className='gall-carousel'>
                      <ImageSized
                        url={img.file.url}
                        imgWidth='280'
                        imgHeight='0'
                        alt={img.name ?? ' '}
                      />
            </div>)}
        </Slider>
      </div>
    </>
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


