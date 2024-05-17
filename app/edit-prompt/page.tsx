'use client'
import Form from '@/components/Form'
import { useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation'
import React from 'react'
import { Suspense } from 'react';

function Advance(){
  let searchParams = useSearchParams()
  async function editProp(data:{prompt:string, tag:string}){
    let res = await fetch(`https://osamadoage.pythonanywhere.com/prompts/${id}/edit/`, 
      {
        method:'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          body:data.prompt,
          tag:data.tag
        })
      }
    )
  }
  let id:string = '';
  if(searchParams.get('id')){
       id = searchParams.get('id') as string
      console.log(id)
  }
 return (
  <Form
  type='Edit'
  typeAction={editProp}
/>
 )
}

function EditPrompt() {
    let {data : session, status} = useSession();
    const router = useRouter();
    if (status === 'loading') {
      return <div>Loading...</div>;
    }

    if(!session?.user){
        router && router.push('/')
    }

  return (
    <Suspense fallback={<div className='desc'>Loading...</div>}>
      <Advance/>
    </Suspense>
  )
}

export default EditPrompt