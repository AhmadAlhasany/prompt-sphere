'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/assets/images/logo.svg'
import { signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react'
import { useState, useEffect } from 'react';
import { BuiltInProviderType } from 'next-auth/providers/index'

type ProviderType = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;

function Nav() {
    let {data : session} = useSession();
    const [dropdown, setDropdown] = useState(false);
    const [providers, setProviders] = useState<ProviderType>(null);
    useEffect(()=>{
        async function provide(){
            const registeredProv = await getProviders();
            setProviders(registeredProv);
        }
        provide();
    }, [])
  return (
    <div className='p-2 lg:pt-3 flex-between z-10 w-full max-w-[1300px]'>
        <Link href='/' className='flex items-center'>
            <Image alt='logo' src={logo} width={40} className='sm:ml-4 ml-2'/>
            <h6 className='font-bold ml-2 text-xl'>Promptopia</h6>
        </Link>
        <div className='mr-2 sm:mr-4 flex flex-row'>
            {session?.user ?
            <>
                <div className='sm:flex sm:items-center hidden'>
                    <Link className='black_btn mr-2' href='/create-prompt'>
                        Create prompt
                    </Link>
                    <button className='outline_btn' onClick={() => signOut()}>
                        Sign out
                    </button>
                    <Link href='/profile' className='w-[50px] h-[50px] rounded-full border-[1px] border-black ml-4'>
                        <img alt='Profile photo' className='hover:cursor-pointer rounded-full w-[50px]' src={session?.user.image as string} onClick={() => setDropdown(pre => !pre)}/>
                    </Link>
                </div>
                <div className='sm:hidden block relative'>
                    <img alt='Profile photo' className='hover:cursor-pointer rounded-full w-[50px] h-[50px] border-[1px] border-black' src={session?.user.image as string} onClick={() => setDropdown(pre => !pre)}/>
                    {dropdown && 
                    <div className='dropdown bg-white'>
                        <Link href='/profile' className='dropdown_link' onClick={() => setDropdown(false)}>Profile</Link>
                        <Link href='/create-prompt' className='dropdown_link' onClick={() => setDropdown(false)}>Create Prompt</Link>
                        <button className='black_btn w-full' onClick={()=> signOut()}>Sign out</button>
                    </div>}
                </div>
            </>
            :
                <Link className='black_btn' href='/sign_in'>
                    Sign in
                </Link>
            }
        </div>
    </div>
  )
}

export default Nav