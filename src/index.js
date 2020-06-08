import express from 'express';
import express_graphql from 'express-graphql';
import pkg from 'graphql';
const { buildSchema } = pkg;
// GraphQL schema
var schema = buildSchema(`
    type Query {
        message: String
    }
`);
// Root resolver
var root = {
  message: () => 'Hello World!',
};
// Create an express server and a GraphQL endpoint
var app = express();

app.get('/', function (req, res) {
  res.json('Go to /graphql to test your queries and mutations!');
});

app.use(
  '/graphql',
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => console.log('Express running on localhost:4000'));
