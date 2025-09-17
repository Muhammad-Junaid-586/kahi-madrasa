import Link from 'next/link'
import React from 'react'

const Button = () => {
  return (
    <Link href="/students" >
      <button className='px-4 py-2 bg-black rounded-lg text-white/80 hover:text-white flex items-center justify-center my-4'>Get All Student</button>
    </Link>
  )
}

export default Button