'use client'
import EditeStudent from '@/components/EditeStudent'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'
import "./style.css"

const page = () => {
  const {id} = useParams()
  return (
    <div>
      <EditeStudent id={id}/>
    </div>
  )
}

export default page