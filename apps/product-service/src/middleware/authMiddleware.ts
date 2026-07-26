import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      userId: string
    }
  }
}

export const shouldBeUser = (
  req:Request,
  res:Response,
  next:NextFunction
) => {

  const { isAuthenticated, userId } = getAuth(req)

  if (!isAuthenticated) {
    res.status(401).json({ error: 'Product service is not authenticated' })
    return
  }

  // const auth = getAuth(req)
  // const userId = auth.userId

  // if(!userId){
  //   return res.status(401).json({
  //     message: "You are not authenticated"
  //   })
  // }

  req.userId = userId

  return next()
}