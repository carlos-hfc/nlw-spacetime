import "dotenv/config"

import fastifyCors from "@fastify/cors"
import fastifyJwt from "@fastify/jwt"
import fastify from "fastify"

import { authRoutes } from "./routes/auth"
import { memoryRoutes } from "./routes/memories"

const app = fastify()

app.register(fastifyCors, {
  origin: "*",
})
app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET ?? "secret",
})

app.register(memoryRoutes, { prefix: "/memories" })
app.register(authRoutes, { prefix: "/auth" })

app
  .listen({ port: 3333 })
  .then(() => console.log(`HTTP server running on http://localhost:3333`))
