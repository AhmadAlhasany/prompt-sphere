import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";

const handler = NextAuth({
    providers: [
        Github({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        })
    ],
    callbacks:{
        async signIn({profile, user}){
            try{
                let ress = await fetch('https://osamadoage.pythonanywhere.com/users/create-profile/',{
                    method:'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      username: profile?.name,
                      email: profile?.email,
                      image: user?.image
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