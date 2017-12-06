
import GraphQLServer from './lib/GraphQLServer'

const start = () => {
  const baseURL = 'http://localhost:3000'
  const schema = require('./schemas')
  const graphQLServer = new GraphQLServer(baseURL, schema)
  graphQLServer.start()
}

start()