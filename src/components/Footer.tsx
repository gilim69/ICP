import Link from 'next/link'
import Image from 'next/image'
import lang from '../locales/lang'


export default function Footer() { 
  const t = lang()
  return (
  <>
    <div className='footer'>
      <div className='footer-copyright'>
        <div>{t.ICP}</div>
        <div>	&copy;&nbsp;2023&nbsp; </div>
      </div>
      <div className='footer-links'>
        <Link href='/'><div className='footer-link'>{t.Links.home}</div></Link>
        <Link href='/#blog'><div className='footer-link'>{t.Links.blog}</div></Link>
        <Link href='/calendar'><div className='footer-link'>{t.Links.calendar}</div></Link>
        <Link href='/gallery'><div className='footer-link'>{t.Links.gallery}</div></Link>
        <Link href='/contacts'><div className='footer-link'>{t.Links.contacts}</div></Link>
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


