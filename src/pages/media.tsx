import { useLayoutEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
const { Client } = require('@notionhq/client')
import ImageList from '@mui/material/ImageList'
import ImageSized from '@/components/ImageSized'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import CloseIcon from '@mui/icons-material/Close'

export default function Media({results}) {

//popup list with titles of image sets in gallery
  function SelectLabels() {
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
  function ShowImageWindow({url, width}) { 
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
            sx={{ position: 'absolute', right: 8, fill: 'black', cursor: 'pointer'}}
          />
          <DialogContent >
                  <ImageSized 
                    url={url}
                    imgWidth={width-30}
                    alt={'Image'}
                  />
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

  const ref = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const refShow = useRef(null)
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(120)
  const [columns, setColumns] = useState(1)
  const [showUrl, setShowUrl] = useState('')
  const [imgSetIndex, setImgSetIndex] = useState(0)
  const imgSets = results.filter((e) => e.properties.Photo.files.length > 0)

  useLayoutEffect(() => {
    const w = ref.current?.offsetWidth ?? 380
    setWidth(w)
    let col = imgSets[imgSetIndex].properties.Photo.files.length
    if (col > ~~(w/180)) {
      col = ~~(w/180)
    }
    setColumns(col)
    console.log('W', w)
  }, [])

  const showImage = (url) => {
    setShowUrl(url)
    setOpen(true)
  }

  console.log('media ', results, imgSets)

  return (
    <>
      <div className='mediatek' ref={ref}>
        <div className='media-header'>
          <Button

            sx={{ color: 'goldenrod', mr: 1, mb: 8 }}
            onClick={()=>setIndex(-1)}
            disabled={imgSetIndex <= 0}
          >
            &#9668;&nbsp;Prev
          </Button>

          <SelectLabels/>

          <Button
            sx={{ color: 'goldenrod', ml: 1, mb: 8 }}
            onClick={()=>setIndex(1)}
            disabled={imgSetIndex >= (imgSets.length-1)}
            >
            Next&nbsp;&#9658;
          </Button>
        </div>
            <ImageList variant="masonry" cols={columns} gap={8}>
              {imgSets[imgSetIndex]?.properties.Photo.files.map((img, i) => (
                <div key={i} onClick={() => showImage(img.file.url)}>
                  <ImageSized
                    url={img.file.url}
                    imgWidth={~~(width / columns) - 10}
                    alt={img.name ?? ' '}
                  />
                </div>
              ))}
            </ImageList>
            <ShowImageWindow url={showUrl} width={width - 28} />
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


