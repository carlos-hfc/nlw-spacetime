import type { FastifyInstance } from "fastify"
import { z } from "zod"

import { prisma } from "../lib/prisma"

export async function memoryRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: "asc",
      },
    })

    return memories.map(memory => ({
      id: memory.id,
      coverUrl: memory.coverUrl,
      excerpt: memory.content.substring(0, 115).concat("..."),
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
        userId: "fdas",
      },
    })
  })

  app.put("/:id", async (request, reply) => {
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
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    await prisma.memory.update({
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

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
