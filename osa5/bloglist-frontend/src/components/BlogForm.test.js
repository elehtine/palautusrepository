import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('submit form in right format', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title') 
  const author = component.container.querySelector('#author') 
  const url = component.container.querySelector('#url') 
  const form = component.container.querySelector('form')

  fireEvent.change(title, { target: { value: 'Title' }})
  fireEvent.change(author, { target: { value: 'Author' }})
  fireEvent.change(url, { target: { value: 'www.blog.url' }})
  fireEvent.submit(form)

  expect(createBlog.mock.calls[0][0]).toBe('Title')
  expect(createBlog.mock.calls[0][1]).toBe('Author')
  expect(createBlog.mock.calls[0][2]).toBe('www.blog.url')
  expect(createBlog.mock.calls.length).toBe(1)
})
