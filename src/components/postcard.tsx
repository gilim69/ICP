import * as React from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

export default function PostCard({postCardData}) {
    return (
      <Card sx={{ maxWidth: 680, background: 'goldenrod' }} >
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
          
          <Typography gutterBottom component="div" color="text.secondary">
            {postCardData.description}
          </Typography>

        </CardContent>
        {postCardData.button &&
          <CardActions>
            <Link href={`/blog/${postCardData.id}`}>
              <Button size="small">Read More...</Button>
            </Link>
          </CardActions>
        }
      </Card>
    )
  }