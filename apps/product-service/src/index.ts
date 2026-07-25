import express, {Request, Response} from "express"
import cors from "cors"

import { clerkMiddleware, getAuth } from '@clerk/express'

const app = express()
app.use(cors({
    origin:["http://localhost:3002","http://localhost:3003"], 
    credentials:true
}))

app.use(clerkMiddleware())

app.get("/health",(req:Request,res:Response)=>{
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: Date.now()
    })
})

app.get("test",(req,res)=>{
    const { isAuthenticated, userId } = getAuth(req)

    if (!userId){
        return res.status(401).json({message: "You are not authenticated"})
    }
    
    res.json({
        message: "Product service autheticated"
    })
})

app.listen(8000, ()=>{
    console.log("Product service is running on port 8000")
})