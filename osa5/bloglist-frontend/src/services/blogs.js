import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getConfig = () => {
  return { headers: { Authorization: token } }
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, getConfig())
  return response.data
}

const update = async (id, blog) => {
  // change populated user to id
  blog = { ...blog, user: blog.user.id }
  const response = await axios.put(`${baseUrl}/${id}`, blog)
  return response.data
}

const remove = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`, getConfig())
}

export default { setToken, getAll, create, update, remove }