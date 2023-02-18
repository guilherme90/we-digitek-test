import './module-alias'
import 'dotenv/config'

import env from '@/config/env'

async function run(): Promise<void> {
  const { setupServer } = await import('@/config/server')

  const app = await setupServer()

  app.listen(env.appPort, () =>
    console.log(`🚀 Server running at http://localhost:${env.appPort}/api`, { env: env.envName })
  )
}

;(async (): Promise<void> => await run())()
