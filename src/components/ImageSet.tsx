import {useState} from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageViewer from '@/components/ImageViewer'

export default function ImageSet({imgset, columns}) {
    const [viewOpen, setViewOpen] = useState(false)
    const [viewUrl, setViewUrl] = useState('')

    const openView = (url) => {
        if (columns===1) {
            return null
        } else {
            setViewUrl(url)
            setViewOpen(true)
        }
    }
    
  return (
    <div className='imageset'>
        <ImageList variant="masonry" cols={columns} gap={8}>
            {imgset.map((item) => (
            <ImageListItem key={item.img}>
                <img
                    src={item.img}
                    srcSet={item.img}
                    alt={item.title}
                    loading="lazy"
                    onClick={()=>openView(item.img)}
                    style={{cursor: 'pointer'}}
                />
            </ImageListItem>
            ))}
        </ImageList>
    
        {viewOpen && <ImageViewer url={viewUrl} onClick={()=>setViewOpen(false)}/> }
    </div>
  );
}
