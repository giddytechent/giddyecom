import { getAuth } from "@clerk/hono";
import { createMiddleware } from "hono/factory";
import type { CustomJwtSessionClaims } from "@repo/types";

export const shouldBeUser = createMiddleware<{
  Variables:{
    userId: string
  }
}>(async (c,next)=>{
   const auth = getAuth(c)

  if (!auth?.userId) {
   return c.json({ message: 'Payment service is not authenticated.' }, 401)
  }

  c.set("userId",auth.userId)

  await next()
})

export const shouldBeAdmin = createMiddleware<{
  Variables:{
    userId: string
  }
}>(async (c,next)=>{
   const auth = getAuth(c)

  if (!auth?.userId) {
    return c.json({
      message: 'Payment service is not authenticated.',
    })
  }

  const claims = auth.sessionClaims as CustomJwtSessionClaims

    if (claims.metadata?.role !== 'admin') {
      return c.json({
        message: 'Unauthorized'
      })
    }

  c.set("userId",auth.userId)

  await next()
})