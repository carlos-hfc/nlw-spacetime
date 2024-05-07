import "dotenv/config"

import { resolve } from "node:path"

import fastifyCors from "@fastify/cors"
import fastifyJwt from "@fastify/jwt"
import fastifyMultipart from "@fastify/multipart"
import fastifyStatic from "@fastify/static"
import fastify from "fastify"

import { authRoutes } from "./routes/auth"
import { memoryRoutes } from "./routes/memories"
import { uploadRoutes } from "./routes/upload"

const app = fastify()

app.register(fastifyCors, {
  origin: "*",
})
app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET ?? "secret",
})
app.register(fastifyMultipart)
app.register(fastifyStatic, {
  root: resolve(__dirname, "..", "uploads"),
  prefix: "/uploads",
})

app.register(memoryRoutes, { prefix: "/memories" })
app.register(authRoutes, { prefix: "/auth" })
app.register(uploadRoutes, { prefix: "/upload" })

app
  .listen({ port: 3333 })
  .then(() => console.log(`HTTP server running on http://localhost:3333`))
