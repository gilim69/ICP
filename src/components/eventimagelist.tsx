import * as React from 'react'
import { useState, useRef , useLayoutEffect} from 'react'
//import Box from '@mui/material/Box'
import Image from 'next/image'

export default function EventImageList(props) {
    const Img = typeof(props.ImageArray)==='string'? new Array(props.ImageArray) : props.ImageArray
    const L = Img.length - 1
    const [indImg, setIndImg] = useState(0)
    const [width, setWidth] = useState(600)
    const [height, setHeight] = useState(~~600/1.41)
    const ref: any = useState()

    useLayoutEffect(() => {
        setWidth(ref.current.offsetWidth)
        setHeight(ref.current.offsetHeight)
      }, []);
      

    const changePhoto = (d) => {
        if (L) {
        let l = indImg + d
        if (l > L) {
            l = 0
        } else if (l < 0) {
            l = L
        }
        setIndImg(l)
        }
    }

    const setSize = (img) => {
        let w = img.naturalWidth
        let h = img.naturalHeight
        const W = width
        h = Math.round(h*W/w)
        w = W
        setWidth(w)
        setHeight(h)
    }

    return (
/*        <Box xs={4} sx={{ height: 200, overflowY: 'scroll' }}>
            <ImageList variant="masonry" cols={1} gap={8}>
                {Img.map((item) => (
                    <ImageListItem key={i++}>
                        <img
                            src={`${item.file.url}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.file.url}?w=248&fit=crop&auto=format&dpr=2 2x`} 
                            alt={item.name} 
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box> */
                <div className='event-imgdiv' onClick={()=>changePhoto(1)} ref={ref}>
                    <Image
                        src={Img[indImg]}
                        width={width}
                        height={height}
                        alt=''
                        quality='1'
                        onLoadingComplete={(img) => setSize(img)}    
                    />
                    <div className='event-chgbtn'>
                        <img src={ L? '/images/back.png' : '' } 
                            onClick={()=>changePhoto(-1)} />
                        <img src={ L? '/images/forward.png' : '' } 
                            onClick={()=>changePhoto(1)} />
                    </div>
                </div>
    )
}