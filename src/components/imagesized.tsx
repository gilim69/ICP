import {useState} from 'react'
import Image from 'next/image'

export default function ImageSized({url, imgWidth, imgHeight, alt}){
    if (!url) {return <div />}
    if (!(imgWidth) && !(imgHeight)) {return <div/>}

    const WIDTH = imgWidth ?? 100
    const HEIGHT = imgHeight ?? 100

    const [iWidth, setIWidth] = useState(WIDTH)
    const [iHeight, setIHeight] = useState(HEIGHT)

    const setSize = (img) => {
        let w = img.naturalWidth ?? WIDTH
        let h = img.naturalHeight ?? HEIGHT

        if (imgWidth) {
          h = ~~(h*WIDTH/w)
          w = WIDTH
        } else {
          w = ~~(w*HEIGHT/h)
          h = HEIGHT
        }
        setIWidth(w)
        setIHeight(h)
        console.log('IMAGE-SIZE ', alt, imgWidth, w, imgHeight, h)
    }

    return(
        <div className='block-image'>
          <Image
            src={url}
            width={iWidth}
            height={iHeight}
            quality='100'
            alt={alt ?? ' '}
            onLoadingComplete={(img) => setSize(img)}    
          />
        </div>
      )
}