import express from 'express'
import expressGraphql from 'express-graphql'
import { join } from 'path'
import { loadSchemaSync, GraphQLFileLoader, addResolversToSchema } from 'graphql-tools'
import resolvers from './graphql/resolvers'
import { models, currentUserId } from './sequelize'

const pino = require('pino')
const logger = pino({ prettyPrint: { colorize: true } })
const context = { models, currentUserId }

const schema = loadSchemaSync(join(__dirname, './graphql/*.graphql'), {
	loaders: [new GraphQLFileLoader()],
})

const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

const contextMiddleware = (req, res, next) => {
	logger.info('Running middleware')
	console.log(context)
	next()
}

const app = express()

app.use(contextMiddleware)

app.get('/', (req, res) => {
	res.send({
		request: 'OK',
		api: '/api',
		playground: '/graphql',
	})
})

app.use(
	'/graphql',
	expressGraphql({
		schema: schemaWithResolvers,
		rootValue: global,
		graphiql: true,
		context,
		pretty: true,
	})
)

app.listen(4000)
logger.info('Server running on localhost:4000')
