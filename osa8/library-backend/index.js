const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

const uuid = require('uuid/v1')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://fullstack:salainen123@cluster0-qsvpo.mongodb.net/graphql?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      return Book.find({}).populate('author')
    },
    allAuthors: () => {
      return Author.find({})
    }
  },
  Author: {
    bookCount: (root) => 0
  },
  Mutation: {
    addBook: async (root, args) => {
      console.log(args)
      let author = await Author.findOne({ name: args.author })
      console.log('author:', author)
      if (!author) {
        console.log('create new author')
        author = new Author({
          name: args.author
        })
        await author.save()
        console.log('author:', author)
      }

      const book = await new Book({ ...args, author })
      return book.save()
    },
    editAuthor: (root, args) => {
      const oldAuthor = authors.find(author => author.name === args.name)
      if (!oldAuthor) {
        return null
      }

      const newAuthor = {
        ...oldAuthor,
        born: args.setBornTo
      }
      authors = authors.map(author => author.name !== args.name ?
        author : newAuthor)
      return newAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
