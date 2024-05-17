'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@/components/Form'

function CreatePrompt() {
  let {data : session, status} = useSession();
  console.log(session?.user?.image)
  const router = useRouter();
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if(!session?.user){
      router && router.push('/')
  }

  async function create(data:{prompt:string, tag:string}){
    let res = await fetch('https://osamadoage.pythonanywhere.com/prompts/create/', 
      {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tag:data.tag,
          body:data.prompt,
          email:session?.user?.email
        })
      }
    )
  }

  return (
    <Form type='Create'
      typeAction={create}
    />  
  )
}

export default CreatePrompt