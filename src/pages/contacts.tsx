import Head from 'next/head'
import Layout from '@/components/layout'

export default function Contacts() {
  return (
    <Layout>
      <div className='event-list'>
        <h1 className='event-title'>Contacts</h1>
        <div className='event-record'><b>Contact information of International Club Puebla:</b></div>
          <div className='event-head'>Email:</div>
            <div className='event-record'> info@internationalclubpuebla.com</div>
          <div className='event-head'>Phone:</div>
            <div className='event-record'> +52 222 123 4567</div>
          <div className='event-head'>Address:</div> 
            <div className='event-record'>Av. 123, Colonia Centro, Puebla, México</div>
      </div>
    </Layout>
  )
}