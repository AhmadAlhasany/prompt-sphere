'use client'
import React from 'react'
import { signIn, getProviders, LiteralUnion, ClientSafeProvider, useSession } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers/index'
import { useState, useEffect } from 'react';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';

type ProviderType = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;


function Sign() {
    let {data : session} = useSession();
    let router = useRouter()
    const [providers, setProviders] = useState<ProviderType>(null);
    useEffect(()=>{
        async function provide(){
            const registeredProv = await getProviders();
            setProviders(registeredProv);
        }
        provide();
    }, [])

    if(session?.user){
        router && router.push('/')
    }

  return (
    <div className='min-h-full flex items-center justify-center'>
        <div className='flex flex-col justify-between p-4 glassmorphism'>
            {providers ? Object.values(providers).map(pro =>
                <button className='black_btn my-2' onClick = {() => signIn(pro.id)}>
                    Sign in with {pro.name}
                </button>
                
            ):
            <h1>There are no providers available</h1>
            }
        </div>
    </div>
  )
}

export default Sign