import express from 'express'
import expressGraphql from 'express-graphql'
import { join } from 'path'
import { loadSchemaSync, GraphQLFileLoader, addResolversToSchema } from 'graphql-tools'
import resolvers from './graphql/resolvers'
import { models } from './sequelize'
import pino from 'pino'

const logger = pino({ prettyPrint: { colorize: true } })
const schema = loadSchemaSync(join(__dirname, './graphql/*.graphql'), { loaders: [new GraphQLFileLoader()] })
const schemaWithResolvers = addResolversToSchema({ schema, resolvers })
const currentUserId = 1

const contextMiddleware = async (req, res, next) => {
	logger.info('Middleware')
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
		context: { models, currentUserId },
		pretty: true,
	})
)

app.listen(4000)
logger.info('Server running on localhost:4000')
