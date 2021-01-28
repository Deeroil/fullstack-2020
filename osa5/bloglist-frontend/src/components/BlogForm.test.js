import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  test('Event handler gets correct input values on blog creation', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: 'Test title' }
    })

    fireEvent.change(author, {
      target: { value: 'Test Author' }
    })

    fireEvent.change(url, {
      target: { value: 'www.testytest.com' }
    })

    const send = component.getByText('send')
    fireEvent.click(send)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'Test title',
      author: 'Test Author',
      url: 'www.testytest.com'
    })
  })
})