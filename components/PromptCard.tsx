'use client'
import React from 'react'
import Image from 'next/image'
import copy from '@/public/assets/icons/copy.svg'
import tick from '@/public/assets/icons/tick.svg'
import { useRouter } from 'next/navigation'
import { assert } from 'console'


type props = {
    image: string,
    name: string, 
    email: string, 
    prompt: string, 
    tag: string,
    id: number,
    show: boolean
    deleteProp?:(num:number)=>void
}

function PromptCard({image, name, email, prompt, tag, id, show = false, deleteProp}: props) {
  const [copied, setCopied] = React.useState(false)
  const router = useRouter();
  return (
    <div className='prompt_card text-[16px] mb-4 min-w-[280px]'>
      <div>
        <div className='flex-row items-start flex justify-between'>
          <div className='flex-row items-center flex gap-4'>
            <img src={image} className=' w-[40px] h-[40px] rounded-full border-[1px] border-black'/>
            <div className='flex-col text-black font-[500] text-start'>
              {name}
              <span className='block font-[400] text-gray-500'>{email}</span>
            </div>
          </div>
          <div className='pl-2 w-8 h-6'>
            <Image src={copied?tick:copy} alt='copy' className='copy_btn' onClick={()=>{
              setCopied(true);
              window.navigator.clipboard.writeText(prompt);
              setTimeout(() => {
                setCopied(false)
              }, 3000);
              }}/>
          </div>
        </div>
        <div className='pt-8 pb-2 text-start'>
          {prompt}
        </div>
      </div>
      <div>
        <div className='text-blue-500 text-start'>
          #{tag}
        </div>
        {show && <div className={`flex justify-center gap-2 mt-2`}>
          <button className='blu_outline_btn' onClick={()=>router.push(`/edit-prompt?id=${id}`)}>
            Edit
          </button>
          <button className='red_outline_btn' onClick={()=>{
            let ans = confirm('Are you sure you wanna delete this prompt ?')
            if(ans && deleteProp)
              deleteProp(id)}}>
            Delete
          </button>
        </div>}
      </div>
    </div>
  )
}

export default PromptCard