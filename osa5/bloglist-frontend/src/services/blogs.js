import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async newObject => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const res = await axios
    .post(baseUrl, newObject, config)
  return res.data
}

const removeBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  await axios.delete(`${baseUrl}/${id}`, config)
}

const update = async (id, newObject) => {
  const res = await axios
    .put(`${baseUrl}/${id}`, newObject)
  return res.data
}

export default { setToken, getAll, create, update, removeBlog }
