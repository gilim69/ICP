//component for image viewing
import Image from 'next/image'
import styled from 'styled-components';
import Zoom from '@mui/material/Zoom'
import lang from '../locales/lang'

export default function ImageViewer({url, onClick}) {
    if (!url) {return null}
    const ViewerScreen = styled.div`
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.8);
        cursor: pointer;
        z-index: 9888;
        color: black;
        cursor: pointer;
        overflow: auto;
        z-index: 8000;
     `
    
    const ViewerImage = styled.div`
        position: relative;
        width: 98vw;
        height: 98vh;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        cursor: default;
        background: none;
        cursor: pointer;
        overflow: auto;
      `
    const t = lang() 

    return ( 
        <Zoom in={true} timeout={800}>
            <ViewerScreen onClick={onClick}>

                <ViewerImage>
                    <Image 
                        src={url} 
                        layout='fill' 
                        objectFit='contain' 
                        sizes="(max-width: 768px) 100vw, (max-width: 1000px) 50vw, 33vw"
                        alt={t.ICP}
                        placeholder="blur"
                        blurDataURL = {t.files.image_loading}
                    />
                </ViewerImage>
            </ViewerScreen>
            </Zoom>
    )
}