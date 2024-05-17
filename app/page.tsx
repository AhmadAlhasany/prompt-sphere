'use client'
import PromptCard from '@/components/PromptCard'
import React from 'react'

export type prompts = {
  body: string
  created: string
  id: number
  owner: {
    id:number
    email: string
    username: string
    image: string
  }
  tag: string
}[]

function Home() {
  const [filter, setFilter] = React.useState('')
  const [data,setData] = React.useState<prompts | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [prompts, setPrompts] = React.useState<any>()
  React.useEffect(()=>{
    async function fetchData(){
      try{
      setLoading(true);
      let res = await fetch('https://osamadoage.pythonanywhere.com/prompts')
      let data = await res.json()
      setData(data)
      }
      catch(err){
        console.log('an errro occurred', err)
      }
      finally{
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  React.useEffect(()=>{
    if(data?.length) {
      const filteredData = data.filter((pro) => (pro.body.toLowerCase().includes(filter.toLowerCase()) || pro.owner.username.toLowerCase().includes(filter.toLowerCase()) || pro.tag.toLowerCase().includes(filter.toLowerCase())));
      setPrompts(filteredData.map(pro=>{
        return(
          <PromptCard
            prompt={pro.body} tag={pro.tag} key={pro.id}  id={pro.id}
            image={pro.owner.image} name={pro.owner.username}
            email={pro.owner.email} show = {false}
          />
        )
      }))
    }
  },[data, filter]);

  return (
    <div className='text-center pt-[60px]'>
      <h1 className='head_text'>Discover & Share <br className='hidden sm:block'/><span className='orange_gradient'>AI-Powered Prompts</span></h1>
      <div className='w-full flex justify-center'>
        <p className='desc'>Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts</p>
      </div>
      <input type='text' value={filter} onChange={(e)=>setFilter(e.target.value)} placeholder='Search for a tag or username or by content'className='search_input my-16 m-w-[100px]'></input>
      <div className='flex gap-4 flex-wrap mb-8 items-stretch'>
      {loading ? <h1 className='desc'>Loading...</h1> : prompts}
      </div>
    </div>
  )
}

export default Home