const mongoose = require("mongoose");

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Person = mongoose.model("Person", phonebookSchema);

// Person.find({}).then(result => {
//     console.log(result)
//     mongoose.connection.close()
// })
// const person = new Person({
//     name: "Agustin",
//     number: "2657241761"
// })

// person.save()
//     .then( result => {
//         console.log('persona agendada')
//         console.log(result)
//         mongoose.connection.close()
//     })

module.exports = Person;
