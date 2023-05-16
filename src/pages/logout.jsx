import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import { useUser } from '@/components/auth/useUser'

export default function Home() {
    const { user, logout } = useUser()
    const router = useRouter()
    return (
        <>
        <Layout>
            <div className='event-title'> Do you want logout? </div>
            <div className='button-group'> 
                <div className='button red' onClick={() => logout()}> Yes, logout </div>
                <div className='button grey' onClick={() => router.back()}> No, go back </div> 
            </div>
        </Layout>
        </>
    )
}

