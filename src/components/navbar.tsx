import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import Profile from '@/components/profile'

import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone'
import DateRangeTwoToneIcon from '@mui/icons-material/DateRangeTwoTone'
import AutoAwesomeMotionTwoToneIcon from '@mui/icons-material/AutoAwesomeMotionTwoTone';
import ContactsTwoToneIcon from '@mui/icons-material/ContactsTwoTone'

const Navbar = () => { 
  const [activeList, setActiveList] = useState(false)
  const router = useRouter()
  const { user } = useUser()
  console.log('USS-', user)

  const MENU_LIST = [
    { text: 'Home', href: '/', icon: <HomeTwoToneIcon/> },
    { text: 'Events', href: '/events', icon: <DateRangeTwoToneIcon/> },
    { text: 'Photo&Video', href: '/photo', icon: <AutoAwesomeMotionTwoToneIcon/> },
    { text: 'Contacts', href: '/contacts',  icon: <ContactsTwoToneIcon/>},
  ]

  const NavItem = ({ text, href, icon }) => {
    return (
      <Link href={href} key={text}>
        <div className={`${(router.pathname===href) ? ' active' : ''} nav-item`}>
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
                  width={89}
                  height={89}
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
          <div className="dropbtn"><img src="/images/US.png" alt="US"/></div>
          <div className="dropdown-content">
            <Link href="#us"><img src="/images/US.png" alt="US"/>&nbsp; USA</Link>
            <Link href="#mx"><img src="/images/MX.png" alt="MX"/>&nbsp; Mexicano</Link>
            <Link href="#ru"><img src="/images/RU.png" alt="RU"/>&nbsp; Русский</Link>
          </div>
        </div>

      </nav>
    </div>
  )
}

export default Navbar

