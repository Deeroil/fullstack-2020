import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

let component
let mockHandler

beforeEach(() => {
  const mockUser = {
    user: 'mockuser',
    username: 'mockname'
  }
  const mockBlog = {
    title: 'Test title',
    author: 'Test Author',
    url: 'www.test.org',
    likes: '100',
    user: mockUser
  }

  mockHandler = jest.fn()

  component = render(
    <Blog
      blog={mockBlog}
      loggedUser={mockUser}
      handleUpdate={mockHandler}
      handleRemoval={mockHandler}
    />
  )
})

/**
 * Make a test which checks that the component displaying a blog
 * renders the blog's title and author, but does not render its url
 * or number of likes by default
 * Add CSS-classes to the component to help the testing as necessary.
 */

describe('<Blog />', () => {

  test('renders title and author', () => {
    expect(component.container)
      .toHaveTextContent('Test title, Test Author')
  })

  test('default doesnt show likes and url', () => {
    expect(component.container)
      .not.toHaveTextContent('www.test.orglikes:100likemockuserremove')
  })

  test('url and likes shown after button click', () => {
    const button = component.getByText('details')
    fireEvent.click(button)

    expect(component.container)
      .toHaveTextContent('www.test.orglikes:100likemockuserremove')
  })

  test('when like btn is clicked twice, the event handler func is called twice', () => {
    const detButton = component.getByText('details')
    fireEvent.click(detButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})