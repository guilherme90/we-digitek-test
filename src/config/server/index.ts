import express, { Express } from 'express'
import { attachControllers } from '@decorators/express'

import setupRoutes from './routes'
import setupSwagger from './swagger'
import setupMiddlewares from './middlewares'

import { MatchController } from '@/app/controllers/match.controller'

export const setupServer = async (): Promise<Express> => {
  const app = express()

  setupSwagger(app)
  setupMiddlewares(app)
  setupRoutes(app)

  const apiRouter = express.Router()

  await attachControllers(apiRouter, [MatchController])
  app.use('/api', apiRouter)

  return app
}
