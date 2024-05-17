import './global.css'
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'

export const metadata = {
  title: 'PromptSphere',
  description: 'Explore PromptSphere, the premier destination for sharing and discovering AI prompts. Enhance your AI interactions, learn from a global community, and contribute to the future of AI communication.',
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className='w-full bg-orange-600 h-[70px] fixed bg-white z-20'>
            <div className='max-w-[1300px] ml-auto mr-auto w-full z-20 ml-auto mr-auto'>
              <Nav/>
            </div>
          </div>
            <div className='main'>
              <div className='gradient' />
            </div>
          <div className='max-w-[1300px] ml-auto mr-auto min-h-[100svh] h-[100svh]'>
            <main className='app min-h-[100svh] h-[100svh] pt-[80px]'>
              {children}
            </main>
          </div>
        </Provider>
      </body>
    </html>
  )
}
