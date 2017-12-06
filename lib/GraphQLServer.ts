import Server from './Server'

class GraphQLServer extends Server {
  private static defaultOption = { endpointURL: '/graphql', graphiqlEnabled: 'production' }

  constructor(baseURL, schema, options = GraphQLServer.defaultOption) {
    super(baseURL)

    // GraphQL
    const { endpointURL } = options
    const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
    this._app.use(endpointURL, graphqlExpress({ schema }))
    console.info(`GraphQL  : ${baseURL}${endpointURL}`)

    // GraphiQL
    const { graphiqlEnabled = process.env.NODE_ENV !== 'production' } = options
    if (graphiqlEnabled) {
      const graphiqlPath = '/graphiql'
      this._app.get(graphiqlPath, graphiqlExpress({ endpointURL }))
      console.info(`GraphiQL : ${baseURL}${graphiqlPath}`)
    }
  }
}

export default GraphQLServer
