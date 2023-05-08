import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Logo from './Logo'

const MENU_LIST = [
  { text: 'About', href: '/' },
  { text: 'Events', href: '/events' },
  { text: 'Photo', href: '/photo' },
  { text: 'Video', href: '/video' },
  { text: 'Contacts', href: '/contacts' },
]

const NavItem = ({ text, href, active }) => {
  return (
    <Link href={href}>
      <div
        className={`nav__item ${
          active ? "active" : ""
        }`}
      >
        {text}
      </div>
    </Link>
  )
}

const Navbar = () => {
  const [navActive, setNavActive] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  return (
    <div className='nav-header'>
      <nav className={'nav'}>
        <Link href={'/'}>
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
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}  >
          {MENU_LIST.map((menu, idx) => (
            <div className='nav__link'
              onClick={(ev) => {
                setActiveIndex(idx)
                setNavActive(false)
              }}
              key={menu.text}
            >
              <NavItem active={activeIndex === idx} {...menu} />
            </div>
          ))}
        </div>
        <div className="dropdown">
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