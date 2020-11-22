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
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}