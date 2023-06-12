import Link from 'next/link'
import ImageSized from '@components/ImageSized'

export function getStyle(a) {
  if (!a) {return {}}

  return({
    fontWeight: a.bold? "bold" : "inherit",
    fontStyle: a.italic? "italic" : "inherit",
    color: a.color==="default"? "inherit" : a.color,
    textDecoration: a.underline? "underline" : "none"
  })
}

export default function BlockHTML({blockData}) {
 // console.log('blockData', blockData)
  const bType = blockData?.type ?? 'no_type'
  let b = blockData
  if (!b) {return <div>'Error! Undefined block'</div>}
  while (b.type) {    // (b.type && !(b.rich_text||b.title) - more strong variant
    b = b[b.type]
  }

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
  if (!b.length) {return null} // no text in block

  if (!b) {return <div>'Error! No rich_text or title property'</div>}
  return (
    <div className={'block-'+bType}> 
      {b?.map((e, i) => {return (
        e.href? 
        <Link key={i} href={e.href}><span style={getStyle(e.annotations)}> {e.plain_text} </span></Link>
        : 
        <span key={i} style={getStyle(e.annotations)}> {e.plain_text} </span>
      )})}
    </div>
  )
}

