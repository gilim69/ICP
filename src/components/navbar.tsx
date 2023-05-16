import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import  withAuth  from '@/components/auth/withAuth'
import { useUser } from '@/components/auth/useUser'

import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone'
import DateRangeTwoToneIcon from '@mui/icons-material/DateRangeTwoTone'
import PhotoCameraTwoToneIcon from '@mui/icons-material/PhotoCameraTwoTone'
import VideoCameraFrontTwoToneIcon from '@mui/icons-material/VideoCameraFrontTwoTone';
import ContactsTwoToneIcon from '@mui/icons-material/ContactsTwoTone'
import InputTwoToneIcon from '@mui/icons-material/InputTwoTone'
import OutputTwoToneIcon from '@mui/icons-material/OutputTwoTone'

const Navbar = () => { 
  const [activeList, setActiveList] = useState(false)
  const router = useRouter()
  const { user, logout } = useUser()

  const MENU_LIST = [
    { text: 'About', href: '/', icon: <HomeTwoToneIcon/> },
    { text: 'Events', href: '/events', icon: <DateRangeTwoToneIcon/> },
    { text: 'Photo', href: '/photo', icon: <PhotoCameraTwoToneIcon/> },
    { text: 'Video', href: '/video', icon: <VideoCameraFrontTwoToneIcon/> },
    { text: 'Contacts', href: '/contacts',  icon: <ContactsTwoToneIcon/>},
    user? { text: user.email, href: '/logout', icon: <OutputTwoToneIcon/>} 
      : { text: 'Sign in [up]', href: '/signin', icon: <InputTwoToneIcon/>}
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
                  src="/logo_icp.png"
                  alt="International club Puebla"
                  className="logo-picture"
                  width={48}
                  height={48}
                  priority
              />
              <h1>&nbsp; International club Puebla</h1>
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

