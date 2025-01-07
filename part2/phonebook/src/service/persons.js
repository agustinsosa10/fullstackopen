import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons/'

const getAll = () => {
    const request = axios.get(baseUrl)
return request
.then(response => response.data)
.catch(error => {
    console.error("error al obtener datos", error)
})
}

const create = (newPerson) => {

    const request = axios.post(baseUrl, newPerson)
    return request.then( response => {
        const {data} = response
        console.log("persons, persona creada", response.data)
        return data
})
}

const update = (id, newPerson) => {
    console.log('id de la persona: ', id)
    console.log(newPerson)
    const request = axios.put(`${baseUrl}${id}`, newPerson)
    return request.then( response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}${id}`)
    return request.then( response => response.data)
}

export default {
    getAll,
    create,
    update,
    remove
}