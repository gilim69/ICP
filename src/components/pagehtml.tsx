import BlockHTML from '@components/BlockHTML'
// converting Notion page content from db-query to html-code
export default function PageHTML({pageContent}) {
//    console.log('PageHTML', pageContent)
    const pType = pageContent?.type ?? 'no_type'
    return (
        pageContent?.map((e, i) => {return(
        <div key={'page'+i} className='page'>
            <BlockHTML blockData={e}/>
        </div>    
        )})
    )    
}