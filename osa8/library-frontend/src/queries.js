import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
      id
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $year: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title
      published: $year
      author: $author
      genres: $genres
    ) {
      title
      published
      author
      genres
      id
    }
  }
`


