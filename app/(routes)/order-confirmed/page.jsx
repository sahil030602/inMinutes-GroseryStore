import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const OrderConfirmed = () => {
  return (
    <div className='flex  justify-center my-20'>
      <div className='flex flex-col border shadow-md justify-center items-center p-20 rounded-md gap-3 px-32'>
        <CheckCircle2 className='w-32 h-32 text-primary'/>
        <h1 className='font-medium text-3xl text-primary'>Order Successfull</h1>
        <h2>Thank You so much for Order</h2>
        <Link href={"/myOrder"}><Button className="mt-8">Track Our Order</Button></Link>
      </div>
    </div>
  )
}

export default OrderConfirmed
