"use client"

import { useSearchParams } from 'next/navigation'
import Dream from '@/components/Dream'

export default function Page() {
  const searchParams = useSearchParams()
  // const id = searchParams.get('id')
  const id = 'jqP2nqWmJDeuKl7fgfkc' // temporary

  return (
    <Dream id={id}/>
  )
}
