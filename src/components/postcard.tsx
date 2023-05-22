import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function PostCard({p}) {
    return (
      <Card sx={{ maxWidth: 680 }}>
        {p.img?
          <CardMedia
            sx={{ height: 140 }}
            image={p.img}
            title={p.title}
          />
        : ''}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {p.title}
          </Typography>
          
            {p.description}

        </CardContent>
        {p.button?
          <CardActions>
            <Link href={`/blog/${p.id}`}>
              <Button size="small">Read More...</Button>
            </Link>
          </CardActions>
        :''}
      </Card>
    );
  }