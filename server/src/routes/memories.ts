import type { FastifyInstance } from "fastify"
import { z } from "zod"

import { prisma } from "../lib/prisma"

export async function memoryRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async request => {
    await request.jwtVerify()
  })

  app.get("/", async request => {
    const memories = await prisma.memory.findMany({
      where: {
        userId: request.user.sub,
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    return memories.map(memory => ({
      id: memory.id,
      coverUrl: memory.coverUrl,
      excerpt: memory.content.substring(0, 115).concat("..."),
      createdAt: memory.createdAt,
    }))
  })

  app.get("/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUnique({
      where: {
        id,
      },
    })

    if (!memory) {
      return reply.status(404).send({
        message: "Memory not found.",
      })
    }

    if (!memory.isPublic && memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    return memory
  })

  app.post("/", async request => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: request.user.sub,
      },
    })
  })

  app.put("/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    let memory = await prisma.memory.findUnique({
      where: {
        id,
      },
    })

    if (!memory) {
      return reply.status(404).send({
        message: "Memory not found.",
      })
    }

    if (memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
        userId: "fdas",
      },
    })

    return memory
  })

  app.delete("/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUnique({
      where: {
        id,
      },
    })

    if (!memory) {
      return reply.status(404).send({
        message: "Memory not found.",
      })
    }

    if (memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
