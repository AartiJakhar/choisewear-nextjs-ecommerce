import { useRouter } from 'next/router'
import React from 'react'

export default function slug() {
    const router = useRouter()
    const {slug}=router.query
  return (
    <div>{slug}</div>
  )
}
