import * as React from 'react'
import { useState, useRef , useLayoutEffect} from 'react'
import Image from 'next/image'

export default function EventImageList(props) {
    const Img = typeof(props.ImageArray)==='string'? new Array(props.ImageArray) : props.ImageArray
    const L = Img.length - 1
    const [indImg, setIndImg] = useState(0)
    const [width, setWidth] = useState(600)
    const [height, setHeight] = useState(~~600/1.41)
    const ref: any = useRef()

    useLayoutEffect(() => {
        const w = ref.current.offsetWidth || 600
        const h = ref.current.offsetHeight || ~~w/1.41
        setWidth(w)
        setHeight(h)
      }, []);
      
    setTimeout(()=>changePhoto(1), 12000)

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
        let w = img.naturalWidth || ~~600
        let h = img.naturalHeight || ~~w/1.41
        const W = width
        h = Math.round(h*W/w)
        w = W
        setWidth(w)
        setHeight(h)
    }

    return (
                <div className='event-imgdiv' onClick={()=>changePhoto(1)} ref={ref}>
                    <Image
                        src={Img[indImg]}
                        width={width}
                        height={height}
                        alt=''
                        quality='1'
                        onLoadingComplete={(img) => setSize(img)}    
                    />

                    {L?
                    <div className='event-chgbtn'>
                        <span onClick={()=>changePhoto(-1)}>
                            &#9658;
                        </span>
                        <span onClick={()=>changePhoto(1)}>
                            &#9668;
                        </span>
                    </div>
                    : ''}
                </div>
    )
}