import {useState} from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ViewImage from '@components/ViewImage'

export default function ImageSet({imgset}) {
    const [viewOpen, setViewOpen] = useState(false)
    const [viewUrl, setViewUrl] = useState('')

    const openView = (url) => {
        setViewUrl(url)
        setViewOpen(true)
    }

    const setClose = () => {
        setViewOpen(false)
    }
    
  return (
    <div className='imageset'>
        <ImageList variant="masonry" cols={4} gap={8}>
            {imgset.map((item) => (
            <ImageListItem key={item.img}>
                <img
                    src={item.img}
                    srcSet={item.img}
                    alt={item.title}
                    loading="lazy"
                    onClick={()=>openView(item.img)}
                />
            </ImageListItem>
            ))}
        </ImageList>
    
        {viewOpen && <ViewImage url={viewUrl} onClick={setClose}/> }
    </div>
  );
}
