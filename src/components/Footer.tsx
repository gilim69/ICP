import Link from 'next/link'
import Image from 'next/image'

export default function Footer() { 

  return (
  <>
    <div className='footer'>
      <div className='footer-part copyright'>Copyright ...</div>
      <div className='footer-part links'>
        <Link href='/'>Home</Link>

        <Link href='/#blog'>Blog & New</Link>

        <Link href='/media'>Photos & Videos</Link>

        <Link href='/contacts'>Contacts</Link>
      </div>
      <div className='footer-part icons'>
        <Link href='https://chat.whatsapp.com/G1xRRP5Qy6R5ps0LpkjGCt'>
          <Image src='/whatsapp-100.png' width='28' height='28' alt='Whatsapp'/>
        </Link>
        <Link href='https://instagram.com/internationalclubpuebla' >
          <Image src='/instagram-100.png' width='28' height='28' alt='Instagram'/>
        </Link>   
      </div>
    </div>
  </>
  )
}


