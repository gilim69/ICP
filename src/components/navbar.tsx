import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Navbar = () => { 
  const [activeList, setActiveList] = useState(false)
  const router = useRouter();

  const MENU_LIST = [
    { text: 'About', href: '/' },
    { text: 'Events', href: '/events' },
    { text: 'Photo', href: '/photo' },
    { text: 'Video', href: '/video' },
    { text: 'Contacts', href: '/contacts' },
    { text: 'Sign in [up]', href: '/sign-in'}
  ]

  const NavItem = ({ text, href }) => {
    return (
      <Link href={href} key={text}>
        <div className={`${(router.pathname===href) ? ' active' : ''} nav-item`}>
          {text}
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

