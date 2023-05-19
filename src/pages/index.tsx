import Layout from '@/components/layout'
import Link from 'next/link'
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';

export default function Home() {
  return (
    <>
    <Layout>
    
    <h1 className='first-title'>International club of Puebla</h1>
    <br></br>
    <h3 className='title'>Are you not with us yet? Join now!</h3>
    <div className='title'>
      <Link href='/api/auth/login'>
        <Button variant="text" startIcon={<LoginIcon />}>Sign up to the site</Button>
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link href='https://chat.whatsapp.com/G1xRRP5Qy6R5ps0LpkjGCt'>
        <Button variant="text" startIcon={<img src='/whatsapp-50.png' width='21'/>}>Join to Whatsapp group</Button>
      </Link>
    </div>

    </Layout>
    </>
  )
}
