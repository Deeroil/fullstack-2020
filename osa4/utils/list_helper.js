const _ = require('lodash')

const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    var total = 0
    blogs.forEach(blog => {
        total += blog.likes
    })
    return total
}

const favoriteBlog = (blogs) => {
    var mostLikes = blogs[0]

    blogs.forEach(blog => {
        if (blog.likes > mostLikes.likes) {
            mostLikes = blog
        }
    })
    return mostLikes
}

const mostBlogs = (blogs) => {
    const grouped = _.groupBy(blogs, 'author')

    let mostBlogs = {
        author: null,
        blogs: 0
    }

    for (let key in grouped) {
        const author = key
        const blogCount = grouped[key].length
        if (blogCount >= mostBlogs.blogs) {
            mostBlogs.author = author
            mostBlogs.blogs = blogCount
        }
    }
    return mostBlogs
}

const mostLikes = (blogs) => {
    const grouped = _.groupBy(blogs, 'author')

    let mostLikes = {
        author: null,
        likes: 0
    }

    for (let key in grouped) {
        const likes = _.sum(_.map(grouped[key], 'likes'))

        if (likes >= mostLikes.likes) {
            mostLikes.author = key
            mostLikes.likes = likes
        }
    }
    return mostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}