const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/persons")
  .then(() => console.log("connected"))
  .catch((err) => console.log("error al conectarse", err));

// id: 1,
// name: "Arto Hellas",
// number: "040-123456",
// },
