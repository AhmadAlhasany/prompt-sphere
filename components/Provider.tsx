'use client'
import { SessionProvider } from "next-auth/react";

type providerProps = {
    children: React.ReactNode,
    session?: any,
}

function Provider({children ,session}:providerProps){
    return(
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}

export default Provider