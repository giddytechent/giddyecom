import express, { Request, Response } from "express"
import cors from "cors"

import { clerkClient, clerkMiddleware, getAuth } from '@clerk/express'
import { shouldBeUser } from "./middleware/authMiddleware.js"

const app = express()
app.use(cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true
}))

app.use(clerkMiddleware())

app.get("/health", (req: Request, res: Response) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: Date.now()
    })
})

app.get("/test", shouldBeUser, async (req, res) => {
    res.json({
        message: "Product service autheticated",
        userId: req.userId
    })
})

app.listen(8000, () => {
    console.log("Product service is running on port 8000")
})