let _contents = []

const resolvers = {
  Query: {
    getContents: (root, _, context) => _contents.join(',')
  },
  Mutation: {
    setContent: (_, { value }, context) => {
      _contents.push(value)
      return value
    }
  }
}

module.exports = resolvers
