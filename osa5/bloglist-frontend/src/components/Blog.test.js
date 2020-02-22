import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('show default only title and author', () => {
  const blog = {
    title: 'Title',
    author: 'Author',
    url: 'www.blog.url',
    likes: 1337,
    user: {
      name: 'Elias Lehtinen',
      username: 'ELlAS'
    }
  }

  const user = {
    name: 'Elias Lehtinen',
    username: 'ELlAS'
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  expect(component.container).toHaveTextContent('Title')
  expect(component.container).toHaveTextContent('Author')
  expect(component.container).not.toHaveTextContent('www.blog.url')
  expect(component.container).not.toHaveTextContent('1337')
})

test('url and likes can be shown', () => {
  const blog = {
    title: 'Title',
    author: 'Author',
    url: 'www.blog.url',
    likes: 1337,
    user: {
      name: 'Elias Lehtinen',
      username: 'ELlAS'
    }
  }
  const user = {
      name: 'Elias Lehtinen',
      username: 'ELlAS'
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).toHaveTextContent(blog.url)
  expect(component.container).toHaveTextContent(blog.likes)
})

test('pressing likes button two times calls event handler two times', () => {
  const blog = {
    title: 'Title',
    author: 'Author',
    url: 'www.blog.url',
    likes: 1337,
    user: {
      name: 'Elias Lehtinen',
      username: 'ELlAS'
    }
  }

  const user = {
      name: 'Elias Lehtinen',
      username: 'ELlAS'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} updateBlog={mockHandler} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls.length).toBe(2)
})
