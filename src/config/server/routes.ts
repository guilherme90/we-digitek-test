import { Express } from 'express'
import env from '@/config/env'

export default (app: Express): void => {
  app.get('/healthcheck', async (_req, response) => {
    return response.status(200).json({
      version: env.appVersion
    })
  })

  app.get('/', async (_req, respose) => {
    return respose.status(200).json({
      version: env.appVersion
    })
  })
}
