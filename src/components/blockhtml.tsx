import Link from 'next/link'
import ImageSized from '@/components/imagesized'

export function getStyle(a) {
  if (!a) {return {}}

  return({
    fontWeight: a.bold? "bold" : "normal",
    fontStyle: a.italic? "italic" : "normal",
    color: a.color,
    textDecoration: a.underline? "underline" : "none"
  })
}

export default function BlockHTML({bl}) {
  const bType = bl.type
  let b = bl
  if (!b) {return <div>'Error! Undefined block'</div>}
  while (b.type) {    // (b.type && !(b.rich_text||b.title) - forced variant
    b = b[b.type]
  }
 // console.log('Block: ', bType,  b)


  if (b.start) {return <div className='block-paragraph'> {b.start} </div>} //date type

  if (bType==='image') {       // image type
    const url = b.url
    if (!url) {return <div>Error! No image url</div>}
    return(
      <div className='block-image'>
        <ImageSized url={url}/>
      </div>
    )
  }

  b = b.rich_text||b.title||b
  if (!b.length) {return <br/>} // no text in block

  if (!b) {return <div>'Error! No rich_text or title property'</div>}
  return (
    <div className={'block-'+bType}> 
      {b.map((e, i) => {return (
        e.href? 
        <Link key={i} href={e.href}><span style={getStyle(e.annotations)}> {e.plain_text} </span></Link>
        : 
        <span key={i} style={getStyle(e.annotations)}> {e.plain_text} </span>
      )})}
    </div>
  )
}

