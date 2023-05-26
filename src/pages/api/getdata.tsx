import Link from 'next/link'
const { Client } = require('@notionhq/client')

export function getIcon(b) {
  if (!b.icon) return ''
  return b.icon.emoji? b.icon.emoji : <img src={b.icon.external.url} height='30'/>
}

export function getCover(b) {
  if (!b.cover) return ''
  return b.cover[b.cover.type].url
}

/* export function getStyle(a) {
  const style = {
    fontWeight: a.bold? "bold" : "normal",
    fontStyle: a.italic? "italic" : "normal",
    color: a.color
  }
  return style
}

export function getBlock(b) {
 // console.log(b.id, b)
  switch (b.type) {
    case 'title':
      return (
        <div className='post-title'>
          {b.map((e, i) =>
            <div key={i} style={getStyle(e.annotations)}>fdvsdfvsdfv{e.plain_text}</div>)}
        </div>
      )
    case 'heading_1':
      return (
        <div className='post-h1'>
          {b.heading_1.rich_text.map((e, i) =>
            <div key={i} style={getStyle(e.annotations)}>{e.plain_text}</div>)}
        </div>
      )
    case 'heading_2':
      return (
        <div className='post-h2'>
          {b.heading_2.rich_text.map((e, i) =>
            <h2 key={i} style={getStyle(e.annotations)}>{e.plain_text}</h2>)}
        </div>
      )
    case 'heading_3':
        return (
          <div className='post-h3'>
            {b.heading_3.rich_text.map((e, i) =>
              <h3 key={i} style={getStyle(e.annotations)}>{e.plain_text}</h3>)}
          </div>
        )
    case 'paragraph':
        return (
          <div className='post-text'>
            {b.paragraph.rich_text && b.paragraph.rich_text.map((e, i) => {
              e.href? 
              <a key={i} href={e.href}><span style={getStyle(e.annotations)}> {e.plain_text} </span></a>
              : 
              <span key={i} style={getStyle(e.annotations)}>{e.plain_text}</span>
            })}
          </div>
        )
    case 'rich_text':
      console.log(b.rich_text)
        return (
          <div className='post-text'>
            { b.rich_text.map((e, i) => { 
              e.href? 
              <Link key={i} href={e.href}><span style={getStyle(e.annotations)}> {e.plain_text} </span></Link>
              : 
              <span key={i} style={getStyle(e.annotations)}>{e.plain_text}</span>
            })}
          </div>
        )
    default:
      return ''
  }
}

export function dbRecordData(e) {
  const getMapUrl = (m)=> {
    if (m) {
        const start = m.indexOf('https://')
        if (start+1) {
            const end = m.indexOf('" ')
                return end? m.slice(start, end) : null
            }
        }
    return null
  }

  if (!e) { return '' } 
  
  let imgArray: any[] = []
  let i = 0
  while (e.properties.photo.files[i]) {
    imgArray.push(e.properties.photo.files[i++].file.url)
  }
  const p = {
    Id: e.id,
    Name: e.properties.name.title[0]? e.properties.name.title[0].plain_text : 'UNDEFINED NAME OF EVENT!',
    Date: e.properties.date.date? e.properties.date.date.start.substr(0,10) : 'Undefined Date!',
    Time: getBlock(e.properties.time), //.rich_text[0]? e.properties.time.rich_text[0].text.content : '',
    Location: getBlock(e.properties.location), //.rich_text[0]? e.properties.location.rich_text[0].text.content : '',
    Status: e.properties.status.select? e.properties.status.select.name : 'Undefined',
    Description: getBlock(e.properties.description), //.rich_text[0]? e.properties.description.rich_text[0].text.content : '',
    Img: imgArray,
    MapUrl: getMapUrl(e.properties.map.url), 
    Contacts: getBlock(e.properties.contact), //.rich_text[0]? e.properties.contact.rich_text[0].text.content : '',
    Price: getBlock(e.properties.price), //.rich_text[0]? e.properties.price.rich_text[0].text.content : '',
    View: 'dayGridMonth'
  }
  
  return p
}

*/
