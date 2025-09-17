import Button from '@/components/Button'
import InputForm from '@/components/RegistrationForm'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col gap-2 items-center '>
      <Button/>
      <InputForm />
    </div>
  )
}

export default page