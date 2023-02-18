import { NextFunction, Response } from 'express'
import helmet from 'helmet'

import express, { Express } from 'express'

const cors = (_, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-headers', '*')
  res.set('access-control-allow-methods', '*')
  next()
}

const contentType = (_, res: Response, next: NextFunction): void => {
  res.type('json')
  next()
}

export default (app: Express): void => {
  app.use(cors)
  app.use(contentType)
  app.use(express.json())
  app.use(helmet())
}
