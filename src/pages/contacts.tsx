import Head from 'next/head'
import Layout from '@/components/layout'

export default function Contacts() {
  return (
    <Layout>
      <main>
        <h1>Contacts</h1>
        <p>Contact information of International Club Puebla:</p>
        <ul>
          <li><b>Email:</b> info@internationalclubpuebla.com</li>
          <li><b>Phone:</b> +52 222 123 4567</li>
          <li><b>Address:</b> Av. 123, Colonia Centro, Puebla, México</li>
        </ul>
      </main>
    </Layout>
  )
}