import { Express } from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

export default (app: Express): void => {
  const swaggerDocument = YAML.load(`${process.cwd()}/swagger.yaml`)

  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      customSiteTitle: 'WEDIGITEK DOC API'
    })
  )
}
