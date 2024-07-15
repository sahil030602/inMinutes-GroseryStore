"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const SignIn = () => {
  const[email,setEmail]=useState()
  const[password,setPassword]=useState()
  const [loader, setLoader] = useState(false)
  const router=useRouter()

  // useEffect(()=>{
  //   const jwt =sessionStorage.getItem("jwt")
  //   if(jwt){
  //     router.push("/")
  //   }
  // },[])
  const onSignIn=()=>{
    setLoader(true)
    GlobalApi.SignIn(email,password).then(resp=>{
      sessionStorage.setItem("user",JSON.stringify(resp.data.user))
    sessionStorage.setItem("jwt",(resp.data.jwt))
    router.push("/")
    toast("Login Successfully")
    setLoader(false)
  }
    ,(e)=>{
      toast(e?.response?.data?.error?.message)
      setLoader(false)
    }
  )
  }
  return (
    <div className='flex items-baseline justify-center my-20'>
      <div className='flex flex-col gap-3 justify-center items-center p-10 bg-slate-100 border border-gray-400'>
        <Image src="/logo.png" width={200}height={200} alt='logo for create account '/>
        <h1 className='font-bold text-4xl'>Sign In an Account</h1>
        <p className='text-gray-600 font-semibold'>signIn by using Existing email and password</p>
      <div className='flex flex-col gap-5 mt-7 w-full'>
        <Input type="email"placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)}/>
        <Input  type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        <Button disabled={!(email||password)} onClick={()=>onSignIn()}>{loader?<LoaderIcon className='animate-spin'/>:"Sign In"}</Button>
        <h2 className='text-base'>Not have an Account 
            <Link href={"/createaccount"} className='text-orange-600'>
             Click here to Create Account</Link>
        </h2>
      </div>
      </div>
    </div>
  )
}

export default SignIn
