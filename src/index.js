import express from 'express'
import expressGraphql from 'express-graphql'
import resolvers from './graphql/resolvers'
import { join } from 'path';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { models } from './sequelize'

const schema = loadSchemaSync(join(__dirname, './graphql/*.graphql'), { // Finds all .graphql documents inside here.
	loaders: [
	  new GraphQLFileLoader(), // This is for loading the *.graphql file.
	]
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const loggingMiddleware = (req, res, next) => {
	console.log('ip:', req.ip);
	next();
  }

const app = express()
app.use(loggingMiddleware);
app.get('/', (req, res) => {
	res.json('Go to /graphql to test your queries and mutations!')
})

app.use('/graphql',expressGraphql({
	schema: schemaWithResolvers,
	rootValue: global,
	graphiql: true,
	context: {models:  models},
	pretty: true,
}),
)

app.listen(4000, () => console.log('Express running on localhost:4000'))
