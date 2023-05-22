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
      <Link href={href}>
        <div className={`${(router.pathname===href) ? ' active' : ''} nav-item `+ text.toLowerCase()}>
          {icon}&nbsp;<div>{text}</div>
        </div>
      </Link>
    )
  }

  return (
    <div className="nav-header" key='nav-header'>
      <nav className="nav" key='nav8888'>
        <Link href='/' key='logo-link'>
          <div className='logo' key='logo-div'>
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
        <div className='nav-bar' key='nav-bar'
              onClick = {() => {setActiveList(!activeList)}}>
          <div key='111'></div>
          <div key='222'></div>
          <div key='333'></div>
        </div>
        <div className={`${activeList ? 'dropdown' : ''} nav-list`} key='nav-list' 
              onClick = {() => setActiveList(false)}>
          {MENU_LIST.map((menu) => ( <NavItem {...menu} key={menu.text} />  ))}
{/*       <div className='nav-item' key='profile'>
           <Profile />
          </div> */}
        </div>



        <div className="dropdown" onClick = {() => setActiveList(false)} key='dropdown'>
          <div className="dropbtn" key='dropbtn'>En</div>
          <div className="dropdown-content" key='dr-content'>
            <Link href="#en" key='en'>English</Link>
            <Link href="#mx" key='es'>Español</Link>
            <Link href="#ru" key='ru'>Русский</Link>
          </div>
        </div>

      </nav>
    </div>
  )
}

export default Navbar

