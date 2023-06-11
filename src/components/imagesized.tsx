import React from 'react'
import {useState, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import styled from 'styled-components';

export const ImageDiv = styled.div<{$width, $height, $float}>`
    position: relative;
    width: ${props => props.$width || '100%'};
    height: ${props => props.$height || '50vw'};
    float: ${props => props.$float || 'none'};
    background: 'grey';
    cursor: pointer;
    overflow: auto;
    margin: 1rem;
`
export default function ImageSized({url, alt = ''}){
    if (!url) {return <div />}

    const ref = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [float, setFloat] = useState('none')
    const [ratio, setRatio] = useState(1.5)

    const imgRatio = (e) => {
        const w = e.target.naturalWidth ?? 100
        const h = e.target.naturalHeight ?? 100
        setRatio(w/h)
    }

    useLayoutEffect(() => {
        const w = ref.current?.offsetWidth ?? 300
            setWidth(String(~~(w))+'px')
            setHeight(String(~~(w/ratio))+'px')
            setFloat('none')            
    }, [ratio])

    return(
      <>
        <ImageDiv 
          ref={ref} 
          $width={width}
          $height={height}
          $float={float}
        >
          <Image
            src={url}
            layout='fill' 
            objectFit='contain' 
            sizes="(max-width: 768px) 100vw, (max-width: 1000px) 50vw, 33vw"
            alt={alt}
            placeholder="blur"
            blurDataURL = '/loading.png'
            onLoad={(img) => imgRatio(img)} 
            />
        </ImageDiv>
      </>
      )
}


