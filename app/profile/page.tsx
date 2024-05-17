'use client'
import PromptCard from '@/components/PromptCard'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { prompts } from '../page';

const Profile = () => {
    let {data : session, status} = useSession();
    const [data,setData] = React.useState<prompts | null>(null)
    const [loading, setLoading] = React.useState(false)
    React.useEffect(()=>{
      async function fetchData(){
        try{
          setLoading(true)
          let res = await fetch('https://osamadoage.pythonanywhere.com/prompts/my-prompts/',{
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              email:session?.user?.email
            })
          })
          let data = await res.json()
          setData(data)
        }
        catch(err){
          console.log('an errro occurred', err)
        }finally{
          setLoading(false)
        }
      }
      fetchData()
    }, [])
    const router = useRouter();

    async function deleteProp(id:number){
      let res = await fetch(`https://osamadoage.pythonanywhere.com/prompts/${id}/delete/`,
        {method:'DELETE'}
      )
      window.location.reload()
    }

    if (status === 'loading') {
      return <div className='desc'>Loading...</div>;
    }

    if(!session?.user){
        router && router.push('/')
    }
    
    let prompts
    if(data?.length)
    prompts = data.map((pro)=>{
      if(pro.owner.email == session?.user?.email)
      return(
        <PromptCard
          prompt={pro.body}
          tag={pro.tag}
          key={pro.id}
          id={pro.id}
          image={pro.owner.image}
          name={pro.owner.username}
          email={pro.owner.email}
          show = {true}
          deleteProp={deleteProp}
        />
      )
    })
    else
      prompts = 'You have not created any prompts yet!!'

  return (
    <div className='pt-[50px]'>
      <h1 className='font-[800] text-4xl blue_gradient h-[44px]'>My Profile</h1>
      <p className='desc mb-14'>Welcome to your personalized profile page</p>
      <div className='flex gap-4 flex-wrap mb-8 items-stretch'>
        {loading ? <h1 className='desc'>Loading...</h1> : prompts}
      </div>
    </div>
  )
}

export default Profile
