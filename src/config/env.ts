const env: NodeJS.ProcessEnv = process.env

const environments: { test: string[]; development: string[] } = {
  test: ['test', 'testing'],
  development: ['dev', 'development', 'qa']
}

export default {
  isDevelopment: environments.development.includes(String(env.NODE_ENV)),
  isTesting: environments.test.includes(String(env.NODE_ENV)),
  debugQueries: [true, 'true'].includes(Boolean(env.DEBUG_QUERIES)),
  envName: env.NODE_ENV,
  appName: env.APP_NAME,
  appVersion: env.APP_VERSION ?? 'local',
  appPort: parseInt(env.APP_PORT ?? '80')
}
