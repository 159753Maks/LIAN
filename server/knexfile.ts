import 'dotenv'
import 'ts-node/register'

// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = require(__dirname + '/src/db/knex.config').knexConfig
