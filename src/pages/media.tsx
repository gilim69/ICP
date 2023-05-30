<<<<<<< HEAD
//Events page
import Link from 'next/link'
import { useEffect } from 'react'
import Layout from '@/components/layout'
import Image from 'next/image'
const { Client } = require('@notionhq/client')
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

export default function Home({results}) {

  useEffect(()=>{
    console.log(results[0].properties.photo.files)
  })

  const imgList = results.filter((el)=>el.properties.photo.files.length>0)

  return (
    <>  

        <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
          <ImageList variant="masonry" cols={3} gap={8}>
            {imgList.map((item) => (
 //             <ImageListItem key={item.id}>
                <Image key={item.id}
                  src={`${item.properties.photo.files[0].file.url}?w=248&fit=crop&auto=format`}
//                  srcSet={`${item.properties.photo.files[0].file.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.properties.name.title[0].plain_text}
                  width={300}
                  height={213}
//                  loading="lazy"
                />
 //             </ImageListItem> 
              ))}
          </ImageList>
        </Box>

=======
import Link from 'next/link'
import { useLayoutEffect, useState, useRef } from 'react'
import Layout from '@/components/Layout'
const { Client } = require('@notionhq/client')
import ImageList from '@mui/material/ImageList'
import ImageSized from '@/components/ImageSized'
//import ShowImage from '@/components/ShowImage'

import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'

export default function Media({results}) {

function ShowImage({url, width}) { 
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
        <DialogContent >
                <ImageSized 
                  url={url}
                  imgWidth={width-30}
                  alt={'Image'}
                />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            X
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

  const ref = useRef<HTMLInputElement>(null)
  const refShow = useRef(null)
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(120)
  const [columns, setColumns] = useState(1)
  const [showUrl, setShowUrl] = useState('')
 
  useLayoutEffect(() => {
    const w = ref.current?.offsetWidth ?? 380
    setWidth(w)
    setColumns(~~(w/180))

    console.log('W', w)
  }, [])

  const showImage = (url) => {
    setShowUrl(url)
    setOpen(true)
  }

  const imgList = results.filter((e)=>e.properties.Photo.files.length>0)

  return (
    <>  
        <div className='mediatek' ref={ref}>
          <ImageList variant="masonry" cols={columns} gap={8}>
            {imgList.map((e) => (
              <div onClick={()=>showImage(e.properties.Photo.files[0]?.file.url)}>
                <ImageSized key={e.id}
                  url={e.properties.Photo.files[0]?.file.url}
                  imgWidth={~~(width/columns)-10}
                  alt={e.properties.Description.rich_text[0]?.plain_text ?? 'Image'}                 
                />
              </div>
              ))}
          </ImageList>
          <ShowImage url={showUrl} width={width-80} />
        </div>
>>>>>>> 92377ee (Black theme)
    </>
  )
}

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_KEY})
  const databaseId = process.env.NOTION_DB_PHOTOS_ID
  const response = await notion.databases.query({
    database_id: databaseId,
<<<<<<< HEAD
    sorts: [
      {
        property: 'name',
        direction: 'ascending',
      }
    ],
=======
>>>>>>> 92377ee (Black theme)
  });
  return {
    props: {
      results: response.results
      }
  }
}


