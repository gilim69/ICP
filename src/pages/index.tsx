import Image from 'next/image'

export default function Home() {
  return (
    <main
      className={'body'}
    >
      <div className="logo">
          <a
            className="link-to-about-page"
            href="#about"
            target="_blank"
          >
            <Image
              src="/logo_icp.png"
              alt="International club Puebla"
              className="logo-picture"
              width={48}
              height={48}
              priority
            />
          </a>
      </div>

      <div className="dropdown">
        <div className="dropbtn"><img src="/images/US.png" alt="US"/></div>
        <div className="dropdown-content">
          <a href="#us"><img src="/images/US.png" alt="US"/>&nbsp; USA</a>
          <a href="#mx"><img src="/images/MX.png" alt="MX"/>&nbsp; Mexicano</a>
          <a href="#ru"><img src="/images/RU.png" alt="RU"/>&nbsp; Русский</a>
        </div>
      </div>

      <nav className="nav-block">
        <a
          href="#about"
          className="nav-link"
          target="_blank"
        >
          <h2 className={'nav-text'} data-title="Information about the International Club of Puebla">
            About{' '}
          </h2>
        </a>

        <a
          href="#events"
          className="nav-link"
          target="_blank"
        >
          <h2 className={'nav-text'} data-title=" The list of our planning and finished events">
            Events{' '}
          </h2>
        </a>

        <a
          href="#photos"
          className="nav-link"
          target="_blank"
        >
          <h2 className={'nav-text'} data-title="The marvelous pictures from our past events and other actions">
            Photos{' '}
          </h2>
        </a>

        <a
          href="#videos"
          className="nav-link"
          target="_blank"
        >
          <h2 className={'nav-text'} data-title="Videos and clips about our life">
            Videos{' '}
          </h2>
        </a>

        <a
          href="#contacts"
          className="nav-link"
          target="_blank"
        >
          <h2 className={'nav-text'} data-title="Our contacts, address and other usefull information">
            Contacts{' '}
          </h2>
        </a>

      </nav>
<br /><br />
      <h1 className='title'>International Club of Puebla</h1>

    </main>
  )
}
