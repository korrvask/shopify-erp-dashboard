import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/dashboard/customers') // or /dashboard/inventory if you make that later
  }, [])

  return <div>Redirecting...</div>
}
