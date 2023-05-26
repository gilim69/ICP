import BlockHTML from '@/components/blockhtml'

export default function PageHTML({pg}) {
   // console.log('PageHTML', pg)
    const pType = pg.type? pg.type : 'no_type'
    return (
        pg.map((e, i) => {return(
        <div key={'page'+i} className={'page-'+pType}>
            <BlockHTML bl={e}/>
        </div>    
        )})
    )    
}