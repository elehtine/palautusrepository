import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('show default only title and author', () => {
  const blog = {
    title: 'Title',
    author: 'Author',
    url: 'www.blog.url',
    likes: 1337
  }

  const component = render(
    <Blog blog={blog} />
  )

  console.log(prettyDOM(component.container))

  expect(component.container).toHaveTextContent('Title')
  expect(component.container).toHaveTextContent('Author')
  expect(component.container).not.toHaveTextContent('www.blog.url')
  expect(component.container).not.toHaveTextContent('1337')
})
