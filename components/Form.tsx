'use client'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'

type FormProps = {
    type: string,
    typeAction:(data:{prompt:string, tag:string}) => void
}

function Form({type, typeAction}:FormProps) {
    const router = useRouter();
    const [form, setFrom] = useState({
        prompt: '',
        tag: ''
    })
    const [loading, setLoading] = useState(false)
    async function handleSubmit(event:FormEvent){
        event.preventDefault();
        try{setLoading(true)
        await typeAction(form)}
        catch(err){
            console.log(err)
        }
        finally{
        setLoading(false)
        router.push('/profile')
        }
    }
    function handleChange(event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>){
        let {name,value} = event.target
        setFrom(pre=>{
            return{
                ...pre,
                [name]: value
            }
        })
    }

  return (
    <form onSubmit={(e)=>handleSubmit(e)} className='pt-[30px] pb-8'>
        <div>
            <h1 className='font-[800] text-4xl blue_gradient'>{type} Post</h1>
            <p className='desc'>{type} an share amazing prompts with the world. and let your imagination run wild with any AI-powerd problem</p>
            <div className='mt-4 text-black font-[500] font-inter'>Your AI Prompt
                <textarea name='prompt' value={form.prompt} onChange={(e)=> handleChange(e)} className='form_textarea' placeholder='Write your prompt here..' required/>
            </div>
            <div className='mt-4'>
                <strong className='text-black font-[500] font-inter'>Tag</strong> <span> (product, webdevelopment)</span>
                <input name='tag' value={form.tag} onChange={(e)=> handleChange(e)} placeholder='idea' className='form_input' required/>
            </div>
        </div>
        <div className='mt-4 flex gap-2'>
            <button className='blu_outline_btn' type='button' onClick={()=> router.push('/profile')}>Cancel</button>
            <input className={`${loading? 'sending':'blue_btn'}`} type='submit' value={type}/>
        </div>
    </form>
    )
}

export default Form