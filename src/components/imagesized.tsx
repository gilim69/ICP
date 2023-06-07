import React from 'react'
import {useState, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import ViewImage from '@components/ViewImage'

export default function ImageSized({url, alt = '', byHeight = false}){
    if (!url) {return <div />}

    const imageRef = useRef<HTMLDivElement>(null)
    const [imageWidth, setImageWidth] = useState(100)
    const [imageHeight, setImageHeight] = useState(100) 
    const [viewOpen, setViewOpen] = useState(false)
    let imageSizeX = 100
    let imageSizeY = 100

    useLayoutEffect(() => {
      let w = imageRef?.current?.offsetWidth ?? 150
      let h = imageRef?.current?.offsetHeight ?? 150
      h = ~~(imageSizeY*w/imageSizeX)
      setImageWidth(w)
      setImageHeight(h)   
      console.log('wh', w, h, imageWidth, imageHeight)
    }, [])

    const getImageSize = (img) => {
      imageSizeX = img.naturalWidth ?? 100
      imageSizeY = img.naturalHeight ?? 100
      console.log('imageSize', imageSizeX, imageSizeY)
    }
    
    const setViewState = () => {
      setViewOpen(false)
    }

    return(
      <>
      {viewOpen && <ViewImage url={url} onClick={setViewState}/> }
        <div 
          ref={imageRef} 
          style={{width: '100%', cursor: 'pointer', position: 'relative'}}
          onClick={() => setViewOpen(true)}  
        >
          <Image
            src={url}
            width={imageWidth}
            height={imageHeight}
            quality='50'
            alt={alt}
            onLoadingComplete={(img) => getImageSize(img)} 
            />
        </div>
      </>
      )
}


