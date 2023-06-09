import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

export default function PostCard({postCardData}) {
    return (
      <Card sx={{ maxWidth: 680, background: 'rgba(218, 165, 32, 0.88)' }} >
        {postCardData.cover &&
          <CardMedia
            sx={{ height: 210 }}
            image={postCardData.cover}
            title={postCardData.title}
          />
        }
        <CardContent >
          <Typography gutterBottom variant="h5" component="div" color="text.primary">
            {postCardData.icon}
            {postCardData.title}
          </Typography>
          
          <div style={{color: 'black'}}>
            {postCardData.description}
          </div>

        </CardContent>
      </Card>
    )
  }