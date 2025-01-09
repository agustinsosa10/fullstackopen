const express = require('express')
const app = express()

app.use(express.json())
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/',(request, response)=> {
  response.send('<h1>hola a todos</h1>')
})

app.get('/api/notes', (request, response)=> {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response)=> {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if(note) {
    response.json(note)
  }else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter( note => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes',(request, response) => {
  const note = request.body
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false
  }

  notes = [...notes, newNote]

  response.json(newNote)
})

const PORT = 3001
app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`)
})