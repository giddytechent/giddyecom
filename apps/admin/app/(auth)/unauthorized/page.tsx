"use client"

import { useAuth } from "@clerk/nextjs"

export default function Unauthorized(){
    const {signOut} = useAuth()
    return (
        <div>
            <h1>You do not have access</h1>
            <button onClick={()=> void signOut()}>Sign out</button>
        </div>
    )
}