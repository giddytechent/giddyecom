import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import type { CustomJwtSessionClaims } from "@repo/types";

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

  const auth = getAuth(req)
  const userId = auth.userId

  if (!userId) {
    res.status(401).json({ message: 'Product service is not authenticated' })
    return
  }

  req.userId = auth.userId

  return next()
}

export const shouldBeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const auth = getAuth(req)
  const userId = auth.userId

  if (!userId) {
    res.status(401).json({ message: 'Product service is not authenticated' })
    return
  }

  const claims = auth.sessionClaims as CustomJwtSessionClaims | undefined

  if (claims?.metadata?.role !== 'admin') {
    res.status(403).json({ message: 'Unauthorized' })
    return
  }

  req.userId = auth.userId

  return next()
}