
import {useState, useRef, useLayoutEffect} from 'react'
import Zoom from '@mui/material/Zoom'
import Image from 'next/image'

export default function ViewImage({url, onClick}) {
 //   if (!url) {return null}

    const viewRef = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(300)
    const [height, setHeight] = useState(200)
    let imageSizeX = 199
    let imageSizeY = 199
    let ratio = 1

    useLayoutEffect(() => {
        let w = viewRef?.current?.offsetWidth ?? 300
        let h = viewRef?.current?.offsetHeight ?? 200 
        w = 0.6*w
        h = 0.6*h
        if (imageSizeY > imageSizeX) {
            w = ~~(imageSizeX*h/imageSizeY)
          } else {
            h = ~~(imageSizeY*w/imageSizeX)
          } 
        setWidth(w)
        setHeight(h)
    }, [viewRef])
    
    const getImageSize = (img) => {
        imageSizeX = img.naturalWidth ?? 300
        imageSizeY = img.naturalHeight ?? 200
        ratio = imageSizeX/imageSizeY
    }

    const handleWeel = (event) => {
        const sign = event.deltaY / Math.abs(event.deltaY)
        if (width<=80) {return}
        let w = width + sign*30
        let h = height + sign*30*ratio
        if (w < 80) {
            w = 80
            h = 80*ratio
        }
        setWidth(w)
        setHeight(h)
    }
//========================================
    return ( 
        <Zoom in={true} timeout={800}>
            <div className='viewer'
                ref={viewRef}
                onClick={onClick}
            >

                <div className='viewer-img'>
                    <Image 
                        src={url} 
                        layout='fill' 
                        objectFit='contain' 
                        sizes="(max-width: 768px) 100vw, (max-width: 1000px) 50vw, 33vw"
                        alt='IPC'
                    />
                </div>
            </div>
            </Zoom>
    )
}