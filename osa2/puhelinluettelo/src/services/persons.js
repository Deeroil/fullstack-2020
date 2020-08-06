import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(response => response.data)
}

const create = newObj => {
    const req = axios.post(baseUrl, newObj)
    //täällä olin unohtanut then(r => r.data)
    return req.then(response => response.data)
}

//update: mitä me updatetaan? puhnro? nimi? mikä arvo?? Woaah
const update = () => {
    const req = axios.put(baseUrl)
    return req.then(response => response.data)
}

//delete? axios.delete?

//toimiskohan näin...?
const remove = (id) => {
    //id = 5
    const req = axios.delete(`${baseUrl}/${id}`)
    return req//.then(response => response.data)
}

export default { getAll, create, update, remove }