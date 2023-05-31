import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
//import { useUser } from '@auth0/nextjs-auth0/client'        // version with autintefication
//import Profile from 'components/profile'                  // version with autintefication

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';

export default function Navbar() { 
  const [activeList, setActiveList] = useState(false)
  const router = useRouter()
//  const { user } = useUser()                                 // version with autintefication

  const MENU_LIST = [
    { text: 'HOME', href: '/', icon: <HomeOutlinedIcon /> },
    { text: 'EVENTS', href: '/calendar', icon: <CalendarMonthOutlinedIcon/> },
    { text: 'PHOTO&VIDEO', href: '/media', icon: <PermMediaOutlinedIcon/> },
    { text: 'CONTACTS', href: '/contacts',  icon: <ContactPhoneOutlinedIcon/>},
  ]

  const NavItem = ({ text, href, icon }) => {
    return (
      <Link href={href}>
        <div className={`${(router.pathname===href) ? ' active' : ''} nav-item `+ text.toLowerCase()}>
          {icon}&nbsp;<div className='nav-item-div'>{text}</div>
        </div>
      </Link>
    )
  }

  return (
  <>
    <div className="nav-header">

      <div className='logo'>
        <Link href='/'>
          <Image
            src="/logoA1.png"
            alt="International club Puebla"
            className="logo-picture"
            width={180}
            height={180}
            priority
          />
        </Link>
      </div>
        
      <nav className="nav">

        <div className='nav-bar' key='nav-bar'
              onClick = {() => {setActiveList(!activeList)}}>
          <div key='111'></div>
          <div key='222'></div>
          <div key='333'></div>
        </div>

        <div className={`${activeList ? 'drpdown' : ''} nav-list`} key='nav-list' 
              onClick = {() => setActiveList(false)}>
          {MENU_LIST.map((menu) => ( <NavItem {...menu} key={menu.text} />  ))}
{/*       <div className='nav-item' key='profile'>                // version with autintefication
           <Profile />
          </div> */}
        </div>
        
        <div className='nav-end'>
          <div className="dropdown" onClick={() => setActiveList(false)} key='dropdown'>
            <div className="dropbtn" key='dropbtn'>En</div>
            <div className="dropdown-content" key='dr-content'>
              <Link href="#en" key='en'>English</Link>
              <Link href="#mx" key='es'>Español</Link>
              <Link href="#ru" key='ru'>Русский</Link>
            </div>
          </div>

        { (router.pathname==='/contacts' || router.pathname==='/')? 
          <div className='whatsapp-link'>
            <Link href='https://chat.whatsapp.com/G1xRRP5Qy6R5ps0LpkjGCt'>
              <Image src='/whatsapp-100.png' height='51' width='51' alt='Whatsapp'/>
              <div className='whatsapp-div'>Join our Whatsapp group!</div>
            </Link>
          </div>
         : '' }
        </div>

      </nav>

    </div>
    </>
  )
}


