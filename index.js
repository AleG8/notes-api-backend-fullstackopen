const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

let notes = [
    {
      "id": 1,
      "content": "HTML is easy",
      "date": "2019-05-30T17:30:31.098Z",
      "important": false
    },
    {
      "id": 2,
      "content": "Browser can execute only JavaScript",
      "date": "2019-05-30T18:39:34.091Z",
      "important": false
    },
    {
      "id": 3,
      "content": "GET and POST are the most important methods of HTTP protocol",
      "date": "2019-05-30T19:20:14.298Z",
      "important": true
    },
    {
      "content": "new note",
      "date": "2022-04-29T20:46:46.114Z",
      "important": false,
      "id": 4
    },
    {
      "content": "new note",
      "date": "2022-04-29T20:47:36.930Z",
      "important": false,
      "id": 5
    },
    {
      "content": "x note",
      "date": "2022-04-29T20:48:16.802Z",
      "important": true,
      "id": 6
    },
    {
      "content": "a new note...helou",
      "date": "2022-04-29T20:49:08.874Z",
      "important": true,
      "id": 7
    },
    {
      "content": "mamachola",
      "date": "2022-04-29T20:52:27.881Z",
      "important": true,
      "id": 8
    },
    {
      "content": "chupapija",
      "date": "2022-04-30T14:52:41.290Z",
      "important": true,
      "id": 9
    }
]

app.get('/', (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
  const {id} = request.params;
  console.log(id)
  const note = notes.find(note => note.id === id)

  if(note) response.send(note);
  else response.status(404).end()
});

app.delete('/api/notes/:id', (request, response) => {
  const {id} = request.params;
  notes = notes.filter(note => note.id !== id);
  response.status(204).end();
});

app.post('/api/notes', (request, response) => {
  const note = request.body;
  
  if(!note || !note.content){
      return response.status(400).json({
          error: 'content is missing'
      })
  }

  let ids = notes.map(note => note.id);
  let maxId = Math.max(...ids);

  const newNote = {
      id: maxId + 1,
      content: note.content,
      important: typeof note.important !== 'undefined' ? note.important : false,
      date: note.date || new Date().toISOString() 
  }

  notes = [...notes, newNote];

  response.json(newNote)
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
})