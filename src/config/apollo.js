import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

const TOKEN = '8fc968f0cb20b14fc4dedfe4e93f622e48a5d37f'
const cache = new InMemoryCache()

const link = createHttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${TOKEN}`,
  },
})

export const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  link: link,
})
