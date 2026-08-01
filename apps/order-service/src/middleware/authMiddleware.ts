import { clerkClient, getAuth } from "@clerk/fastify";
import { FastifyReply, FastifyRequest } from "fastify";
import type { CustomJwtSessionClaims } from "@repo/types";

declare module "fastify" {
    interface FastifyRequest {
        userId?: string
    }
}

export const shouldBeUser = async (request:FastifyRequest,reply:FastifyReply)=>{
     const auth = getAuth(request)
     const userId = auth.userId
    
    if (!userId) {
      return reply.status(401).send({ message: 'Order service is not authenticated' })
    }

    request.userId = auth.userId
}

export const shouldBeAdmin = async (request:FastifyRequest,reply:FastifyReply)=>{
     const auth = getAuth(request)
    
    if (!auth.userId) {
      return reply.status(401).send({ message: 'Order service not authenticated' })
    }

    const claims = auth.sessionClaims as CustomJwtSessionClaims

    if (claims.metadata?.role === 'admin') {
      return reply.status(403).send({ message: 'Unauthorized' })
    }

    request.userId = auth.userId
}