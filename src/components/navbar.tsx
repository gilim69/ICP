import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import lang from '../locales/lang'
//import { useUser } from '@auth0/nextjs-auth0/client'        // version with autintefication
//import Profile from 'components/profile'                  // version with autintefication

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined'
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined'

export default function Navbar() { 
  const [menuList, setMenuList] = useState(false)
  const [localesList, setLocalesList] = useState(false)
  const router = useRouter()
  const locale = Cookies.get('locale') ?? 'en'

//  const { user } = useUser()                                 // version with autintefication
  
  const t = lang()

  const handleLocaleChange = (locale) => {
    if (t.locale!==locale) {
      Cookies.set('locale', locale)
      router.replace(router.asPath, undefined, { locale })
    }
    setLocalesList(false)
  }

  useEffect(() => {
    router.replace(router.asPath, undefined, { locale })
  }, [locale])

  const MENU_LIST = [
    { text: t.Links.home.toUpperCase(), href: '/', icon: <HomeOutlinedIcon /> },
    { text: t.Links.events.toUpperCase(), href: '/calendar', icon: <CalendarMonthOutlinedIcon/> },
    { text: t.Links.gallery.toUpperCase(), href: '/gallery', icon: <PermMediaOutlinedIcon/> },
    { text: t.Links.contacts.toUpperCase(), href: '/contacts',  icon: <ContactPhoneOutlinedIcon/>},
  ]
  const localePath = router.pathname.includes('blog')? '/' : 
                    router.pathname.includes('event')? '/calendar' : router.pathname

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
          <Image
            src="/logoA1.png"
            alt="International club Puebla"
            className="logo-picture"
            width={180}
            height={180}
            priority
          />
      </div>
        
      <nav className="nav">

        <div className='nav-bar' 
              onClick = {() => {setMenuList(!menuList)}}>
          <div key='111'></div>
          <div key='222'></div>
          <div key='333'></div>
        </div>

        <div className={`${menuList ? 'drpdown' : ''} nav-list`}
              onClick = {() => {setMenuList(false);;setLocalesList(false)}}>
          {MENU_LIST.map((menu) => ( <NavItem key={menu.text} {...menu} />  ))}
{/*       <div className='nav-item' key='profile'>                // version with autintefication
           <Profile />
          </div> */}
        </div>
        
        <div className='nav-end'>
          <div className="locales" onClick={() => setMenuList(false)}>
            <div className="locales-current" onClick={()=>setLocalesList(!localesList)}>
              {router.locale?.toUpperCase()}
            </div>
            <div className={`${localesList ? 'dropdown' : ''} locales-select`}>
              <div onClick={() => handleLocaleChange('en')}>English</div>
              <div onClick={() => handleLocaleChange('es')}>Español</div>
              <div onClick={() => handleLocaleChange('ru')}>Русский</div>
            </div>
          </div>

        { (router.pathname==='/contacts' || router.pathname==='/')? 
          <div className='whatsapp-link'>
            <Link href='https://chat.whatsapp.com/G1xRRP5Qy6R5ps0LpkjGCt'>
              <Image src='/whatsapp-50.png' height='48' width='48' alt='Whatsapp'/>
              <div className='whatsapp-tip'>{t.Home.joinWhatsapp}</div>
            </Link>
          </div>
         : '' }
        </div>

      </nav>

    </div>
  </>
  )
}
