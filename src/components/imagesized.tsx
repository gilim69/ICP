import {useState} from 'react'
import Image from 'next/image'

export default function ImageSized({url, imgWidth, alt}){
    if (!url) {return <div />}

    const WIDTH = imgWidth ?? 680

    const [width, setWidth] = useState(WIDTH)
    const [height, setHeight] = useState(~~(WIDTH/1.41))

    const setSize = (img) => {
        let w = img.naturalWidth ?? WIDTH
        let h = img.naturalHeight ?? ~~w/1.41

        if (imgWidth) {
          h = ~~(h*WIDTH/w)
          w = WIDTH
        }
        setWidth(w)
        setHeight(h)
        console.log('IMAGE SIZE ', imgWidth, w, h)
    }

    return(
        <div className='block-image'>
          <Image
            src={url}
            width={width}
            height={height}
            quality='100'
            alt={alt ?? ' '}
            onLoadingComplete={(img) => setSize(img)}    
          />
        </div>
      )
}