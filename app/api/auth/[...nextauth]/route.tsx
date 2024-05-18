import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";

const handler = NextAuth({
    providers: [
        Github({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    callbacks:{
        async signIn({profile, user}){
                let username = profile?.name || user.name
                let email = profile?.email || user.email
                let image = profile?.image || user?.image
                if(!username || !email || !image){
                    throw new Error('Missing credentials')
                }
            try{
                await fetch('https://osamadoage.pythonanywhere.com/users/create-profile/',{
                    method:'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      username,
                      email,
                      image
                    })
                  })
                  return true
            }
            catch(err){
                console.log('********** ',err)
                return false
            }
        },
    }
})

export { handler as GET, handler as POST }