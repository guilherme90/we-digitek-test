const env: NodeJS.ProcessEnv = process.env

export default {
  isDevelopment: ['local', 'dev', 'development', 'qa'].includes(String(env.NODE_ENV)),
  envName: env.NODE_ENV,
  appName: env.APP_NAME,
  appVersion: env.APP_VERSION ?? 'local',
  appPort: parseInt(env.APP_PORT ?? '80')
}
