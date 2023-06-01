import Link from 'next/link'
import Image from 'next/image'

export default function Footer() { 

  return (
  <>
    <div className='footer'>
      <div className='footer-copyright'>
        <div>Copyright © 2023 </div>
        <div>Int. Club of Puebla.</div>
        <div> All rights reserved.</div>
      </div>
      <div className='footer-links'>
        <Link href='/'><div className='footer-link'>Home</div></Link>
        <Link href='/#blog'><div className='footer-link'>Blog&News</div></Link>
        <Link href='/calendar'><div className='footer-link'>Calendar of events</div></Link>
        <Link href='/media'><div className='footer-link'>Photos&Videos</div></Link>
      </div>
      <div className='footer-icons'>
        <Link href='https://chat.whatsapp.com/G1xRRP5Qy6R5ps0LpkjGCt'>
          <Image src='/whatsapp-b-100.png' width='28' height='28' alt='Whatsapp'/>
        </Link>
        <Link href='https://instagram.com/internationalclubpuebla' >
          <Image src='/instagram-b-100.png' width='28' height='28' alt='Instagram'/>
        </Link>   
      </div>
    </div>
  </>
  )
}


