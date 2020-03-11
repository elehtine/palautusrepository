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
    allBooks: async (root, args) => {
      if (args.genre) {
        return Book
          .find({ genres: { $in: [ args.genre ] } })
          .populate('author')
      }

      return Book.find({}).populate('author')
    },
    allAuthors: () => {
      return Author.find({})
    }
  },
  Author: {
    bookCount: (root) => {
      return Book.collection.countDocuments({
        author : { $eq: root._id }
      })
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({
          name: args.author
        })
        await author.save()
      }

      const book = await new Book({ ...args, author })
      return book.save()
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      console.log(author)

      author.born = args.setBornTo
      console.log(author)
      return author.save()
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
