const moduleAlias = require('module-alias')

moduleAlias.addAlias('@', (): string => __dirname)
moduleAlias()
