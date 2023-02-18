import '../src/module-alias'
import { resolve } from 'path'
import * as dotenv from 'dotenv'

dotenv.config({
  path: resolve(process.cwd(), '.env.test')
})
