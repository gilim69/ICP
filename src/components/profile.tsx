import React from 'react'
import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import LoginIcon from '@mui/icons-material/Login';
import Stack from '@mui/material/Stack';

import DialogTitle from '@mui/material/DialogTitle'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/router'

export default function Profile() {
  const { user, error, isLoading } = useUser()
  const [ open, setOpen ] = useState(false)
  const router = useRouter()
    console.log(user, error)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (answer) => {
    setOpen(false)
    if (answer) {
      router.push('/api/auth/logout')
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!user) return <div><a href="/api/auth/login"><LoginIcon/></a></div>
  const email: string = user.email as string
  const picture: string = user.picture as string
    return (
        <>
        <div onClick={()=>handleClickOpen()}>
            <Avatar alt={email} src={picture} />
        </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Do you want to logout?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(0)}>No</Button>
                    <Button onClick={() => handleClose(1)}>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}   