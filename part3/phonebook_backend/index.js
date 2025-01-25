require("./mongo.js");
const express = require("express");
const app = express();
const cors = require("cors");
const Person = require("./models/Person.js");
const notFound = require("./middleware/notFound.js");
const handleErrors = require("./middleware/handleErrors.js");

app.use(express.json());
app.use(cors());

app.get("/info", (request, response) => {
  response.send(
    `Phonebook has info for ${persons.length} people <br> ${Date()}`
  );
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        return response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => {
      console.log(result);
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const person = request.body;

  const newPerson = new Person({
    name: person.name,
    number: person.number,
  });

  newPerson.save().then((savedPerson) => {
    response.json(savedPerson);
  });
  // const equalName = persons.find((person) => person.name === newPerson.name);
  // console.log("estoy en el console log de ", equalName);

  // if (newPerson.name === "" || newPerson.number === "" || equalName) {
  //   response.status(404).json({ error: "name must be unique" });
  // } else {
  //   persons = [...persons, newPerson];

  //   response.json(newPerson);
  // }
});

app.put("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = request.body;

  const newPersonInfo = {
    name: person.name,
    number: person.number,
  };

  Person.findByIdAndUpdate(id, newPersonInfo, { new: true }).then((result) => {
    response.json(result);
  });
});

app.use(notFound);

app.use(handleErrors);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
