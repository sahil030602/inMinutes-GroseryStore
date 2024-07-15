import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const CartItemList = ({cartItemList,onDeleteCartItem}) => {
    
  return (
    <div>
        <div className='h-[555px] overflow-auto '>
            {cartItemList.map((cart,index)=>(
                <div className='flex justify-between items-center p-2 mb-5'key={index}>
                    <div className='flex gap-6 items-center'>
                    <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + cart.images} width={100} height={100} alt={cart.name}/>
                    <div >
                        <h2 className='text-bold'>{cart.name}</h2>
                        <h2> Quantity:{cart.quantity}</h2>
                        <h2 className='text-lg font-bold'>${cart.amount}</h2>
                    </div>
                    </div>
                    <TrashIcon className='cursor-pointer'onClick={()=>onDeleteCartItem(cart.id)}/>
                </div>
            ))}
        </div>      
    </div>
  )
}

export default CartItemList
