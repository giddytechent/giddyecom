import express, { NextFunction, Request, Response } from "express"
import cors from "cors"

import {  clerkMiddleware } from '@clerk/express'
import { shouldBeAdmin } from "./middleware/authMiddleware"
import userRoute from "./routes/user.routes"

const app = express()
app.use(cors({
    origin: ["http://localhost:3003"],
    credentials: true
}))


app.use(clerkMiddleware())
app.use(express.json())

app.get("/health", (req: Request, res: Response) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: Date.now()
    })
})

app.use("/users", shouldBeAdmin, userRoute)


app.use((err:any, req:Request, res:Response, next:NextFunction)=>{
    console.log(err)
    return res.status(err.status || 500).json({message:err.message || "Internal Server Error!"})
})


const start = async () =>{
    try {
        app.listen(8003, ()=>{
            console.log("Auth service is running on 8003")
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
start()