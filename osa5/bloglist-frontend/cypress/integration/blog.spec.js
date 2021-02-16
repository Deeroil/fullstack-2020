describe('Bloglist app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      user: 'Tester Testaaja',
      username: 'testusername',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Front page has correct title', function () {
    cy.contains('Bloglist App')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to Bloglist')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testusername')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
      cy.contains('Logged in as Tester Testaaja')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testusername')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('Login failed')
    })

    it('fails with new credentials', function () {
      cy.get('#username').type('newuser')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('Login failed')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testusername', password: 'testpassword' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Title Test')
      cy.get('#author').type('Author Test')
      cy.get('#url').type('www.TEST.com')
      cy.contains('send').click()

      cy.contains('Added')
      cy.contains('Title Test, Author Test')
    })

    describe('After blog creation', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Title Test', author: 'Author Test', url: 'www.TEST.com' })
      })

      it('Liking raises like count by one', function () {
        cy.contains('details').click()
        cy.contains('likes:0')
        cy.contains('like').click()
        cy.contains('likes:1')
      })

      it('Blog can be deleted by the user who added', function () {
        cy.contains('details').click()
        cy.contains('remove').click()
        cy.contains('Blog \'Title Test\' removed successfully')
        cy.get('html').should('not.contain', 'Title Test, Title Author')
      })
    })

    describe('With two 0 liked blogs', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'First', author: 'Author First', url: 'www.first.com' })
        cy.createBlog({ title: 'Second', author: 'Author Second', url: 'www.second.com' })
      })

      it('Liked blog is moved first', function () {
        //open all details
        cy.get('.detailsBtn')
          .each(($el) => cy.wrap($el).click())

        cy.contains('Second')
          .parent()
          .contains('like').click()

        //liking takes some time
        cy.wait(100)

        cy.get('.likes')
          .then(likes => {
            const likeArray = likes.map((i, el) => {
              const str = el.innerText
              const likeAmount = str.substring(
                str.lastIndexOf(':') + 1,
                str.lastIndexOf('l')
              )
              return likeAmount
            })

            cy.wrap(likeArray[0]).should('contain', '1')
            cy.wrap(likeArray[1]).should('contain', '0')
          })
      })
    })

    describe('With three blogs with diff likes', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Some Title', author: 'Some', url: 'www.SOME.com', likes: 25 })
        cy.createBlog({ title: 'Popular Title', author: 'Pop', url: 'www.POP.com', likes: 100 })
        cy.createBlog({ title: 'Indie Title', author: 'Indie', url: 'www.INDIE.com', likes: 1 })
      })

      it('Blogs are sorted by popularity', function () {
        //open all details
        cy.get('.detailsBtn')
          .each(($el) => cy.wrap($el).click())

        cy.get('.blogContent')
          .then(blogs => {
            cy.wrap(blogs[0].innerText).should('contain', 'Popular')
            cy.wrap(blogs[1].innerText).should('contain', 'Some')
            cy.wrap(blogs[2].innerText).should('contain', 'Indie')
          })
      })
    })
  })
})