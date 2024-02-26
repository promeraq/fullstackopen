const mongoose = require("mongoose");

// Definimos un esquema para una "person".
// Un esquema representa la estructura de los documentos dentro de una colección en MongoDB.
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// Definimos la transformación para cuando un documento de este esquema se convierta a JSON
blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// "Person" is the singular name of the model. Mongoose will call the collection "persons"
module.exports = mongoose.model("Blog", blogSchema);
