import Layout from '@/components/layout'
import { useRouter } from 'next/router'

export default function Eventpage() {
    const router = useRouter()
    const { id } = router.query

    return (
        <div>
            <Layout />
            ID number is {id}
        </div>
    )
}