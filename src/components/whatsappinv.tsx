import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Link from 'next/link';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(true)

  const handleOpen = () => {
    if (!show) { return }
    setShow(false)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  setTimeout(()=>handleOpen(), 4800)

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Whatsapp group of ICP"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you not in our WhatsApp group yet? Join us!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Link href='https://chat.whatsapp.com/G1xRRP5Qy6R5ps0LpkjGCt'>
            <Button variant="text" startIcon={<img src='/whatsapp-50.png' width='21' />}>Join</Button>
            </Link>
            <Button onClick={handleClose}>Later</Button>
            <Button onClick={handleClose}>Don't show this again</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}