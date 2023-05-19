import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import Profile from '@/components/profile'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';

const Navbar = () => { 
  const [activeList, setActiveList] = useState(false)
  const router = useRouter()
  const { user } = useUser()
  console.log('USER-', user)

  const MENU_LIST = [
    { text: 'Home', href: '/', icon: <HomeOutlinedIcon/> },
    { text: 'Events', href: '/calendar', icon: <CalendarMonthOutlinedIcon/> },
    { text: 'Photo&Video', href: '/media', icon: <PermMediaOutlinedIcon/> },
    { text: 'Contacts', href: '/contacts',  icon: <ContactPhoneOutlinedIcon/>},
  ]

  const NavItem = ({ text, href, icon }) => {
    return (
      <Link href={href} key={text}>
        <div className={`${(router.pathname===href) ? ' active' : ''} nav-item `+ text.toLowerCase()}>
          {icon}&nbsp;<div>{text}</div>
        </div>
      </Link>
    )
  }

  return (
    <div className="nav-header">
      <nav className="nav">
        <Link href='/'>
          <div className='logo'>
            <Image
                  src="/logo.jpg"
                  alt="International club Puebla"
                  className="logo-picture"
                  width={68}
                  height={68}
                  priority
              />
          </div>
        </Link>
        <div className='nav-bar'
              onClick = {() => {setActiveList(!activeList)}}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${activeList ? 'dropdown' : ''} nav-list`} 
              onClick = {() => setActiveList(false)}>
          {MENU_LIST.map((menu) => ( <NavItem {...menu} />  ))}
          <div className='nav-item'>
            <Profile />
          </div>
        </div>



        <div className="dropdown" onClick = {() => setActiveList(false)}>
          <div className="dropbtn">En</div>
          <div className="dropdown-content">
            <Link href="#us">English</Link>
            <Link href="#mx">Español</Link>
            <Link href="#ru">Русский</Link>
          </div>
        </div>

      </nav>
    </div>
  )
}

export default Navbar

