const { Client } = require('@notionhq/client')

//const notion = new Client({ auth: process.env.NOTION_API_KEY })
//const databaseId = process.env.NOTION_DATABASE_ID

const qdb = async() => {
  const databaseId = 'd707a7985f794f95961971f7d90939f2'
  const notion = new Client({ auth: 'secret_TMBRvgCicPh93P2XgyNby0E7t0Mu5Ts1yHuR77IuKdy'})

  const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'Date',
          direction: 'ascending',
        }
      ],
  })
  const res = response.results
  const ret = res.map((obj) => obj.url)
  return ret
}


async function Querydb() {
  const databaseId = 'd707a7985f794f95961971f7d90939f2'
  const notion = new Client({ auth: 'secret_TMBRvgCicPh93P2XgyNby0E7t0Mu5Ts1yHuR77IuKdy'})

  const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'Date',
          direction: 'ascending',
        }
      ],
  })
  const res = response.results
  let ret = res.map((obj) => obj.url)
  if (ret===undefined) {
    ret = ['no data']
  }
  ret = ['no data']
  return(
    <ul>
      {ret.map((url) =>'<li> '+url+' </li>')}
    </ul>
  )
}

module.exports Querydb;