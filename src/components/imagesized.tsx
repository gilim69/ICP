import {useState} from 'react'
import Image from 'next/image'

export default function ImageSized({url}, {imgWidth}){
    if (!url) {return <div />}

    const WIDTH = imgWidth? imgWidth : 680

    const [width, setWidth] = useState(WIDTH)
    const [height, setHeight] = useState(~~WIDTH/1.41)

    const setSize = (img) => {
        let w = img.naturalWidth || WIDTH
        let h = img.naturalHeight || ~~w/1.41
        const W = width
        if (w>WIDTH) {
        h = Math.round(h*W/w)
        w = W
        }
        setWidth(w)
        setHeight(h)
    }

    return(
        <div className='block-image'>
          <Image
            src={url}
            width={width}
            height={height}
            quality='1'
            alt=' '
            onLoadingComplete={(img) => setSize(img)}    
          />
        </div>
      )
}