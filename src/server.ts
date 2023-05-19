import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import fastify from 'fastify'
import { resolve } from 'node:path'

import { authRoutes } from './routes/auth'
import { memoriesRoutes } from './routes/memories'
import { uploadRoutes } from './routes/upload'

import 'dotenv/config'

const app = fastify()

app.register(multipart)

app.register(require('@fastify/static'), {
   root: resolve(__dirname, '../uploads'),
   prefix: '/uploads',
})

app.register(cors, { origin: true })
app.register(jwt, { secret: process.env.SECRET_KEY as string })

app.register(memoriesRoutes)
app.register(uploadRoutes)
app.register(authRoutes)

app.listen({
   port: 3333,
   host: '0.0.0.0',
}).then(() => {
   console.log('🚀 HTTP server running on http://localhost:3333')
})
