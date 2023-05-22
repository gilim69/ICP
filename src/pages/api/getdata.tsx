const { Client } = require('@notionhq/client')

export function getIcon(b) {
  if (!b.icon) return null
  return b.icon.emoji? b.icon.emoji : <img src={b.icon.external.url} height='30'/>
}

export function getBlock(b) {
  console.log('BBB', b)
  switch (b.type) {
    case 'title':
      return (
        <div className='post-title'>
          {b.map((e, i) =>
            <div key={i} style={e.annotations}>fdvsdfvsdfv{e.plain_text}</div>)}
        </div>
      )
    case 'heading_1':
      return (
        <div className='post-h1'>
          {b.heading_1.rich_text.map((e, i) =>
            <div key={i} style={e.annotations}>{e.plain_text}</div>)}
        </div>
      )
    case 'heading_2':
      return (
        <div className='post-h2'>
          {b.heading_2.rich_text.map((e, i) =>
            <h2 key={i} style={e.annotations}>{e.plain_text}</h2>)}
        </div>
      )
    case 'heading_3':
        return (
          <div className='post-h3'>
            {b.heading_3.rich_text.map((e, i) =>
              <h3 key={i} style={e.annotations}>{e.plain_text}</h3>)}
          </div>
        )
    case 'paragraph':
        return (
          <div className='post-text'>
            {b.paragraph.rich_text.map((e, i) =>
              <span key={i} style={e.annotations}>{e.plain_text}</span>)}
          </div>
        )
    case 'rich_text':
        return (
          <div className='post-text'>
            {b.rich_text.map((e, i) =>
              <span key={i} style={e.annotations}>{e.plain_text}</span>)}
          </div>
        )
    default:
      return ''
  }
}


export async function getPageData(pageId) {
  const notion = new Client({ auth: process.env.NOTION_KEY })
  const responseHead = await notion.pages.retrieve({ page_id: pageId });
  const responseChildren = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 50,
  });

  return {
    props: {
      blogHead: responseHead,
      blogChildren: responseChildren.results,
      pageID: pageId
    }
  }
}