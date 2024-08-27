require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Contact = require("./models/contact");
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content"
  )
);

morgan.token("content", (req) => {
  return JSON.stringify(req.body);
});

app.get("/", (request, response) => {
  response.send(`<h1>loading</h1>`);
});

app.get("/api/persons", (request, response) => {
  Contact.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Contact.findById(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => {
      response.status(404).send("not found");
    });
});

app.delete("/api/persons/:id", (request, response) => {
  Contact.findByIdAndDelete(request.params.id)
    .then((res) => response.json(res))
    .catch((error) => {
      response.status(404).send("not found");
    });
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${Contact.length()} people</p><p>${new Date()}</p>`
  );
});

app.post("/api/persons", (request, response) => {
  const person = request.body;
  if (!person.name) {
    return response.status(400).json({ error: "person name is missing" });
  }
  if (!person.number) {
    return response.status(400).json({ error: "person number is missing" });
  }

  // if (persons.find((p) => p.name === person.name)) {
  //   return response.status(400).json({ error: "name must be unique" });
  // }
  const contact = new Contact({ name: person.name, number: person.number });

  contact.save().then((savedContact) => {
    response.json(savedContact);
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("server is listering to ", PORT);
});
