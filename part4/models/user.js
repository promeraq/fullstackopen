const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Definimos un esquema para una "person".
// Un esquema representa la estructura de los documentos dentro de una colección en MongoDB.
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  passwordHash: {
    type: String,
    required: true,
  },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
});

// Definimos la transformación para cuando un documento de este esquema se convierta a JSON
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(uniqueValidator);

// "Person" is the singular name of the model. Mongoose will call the collection "persons"
module.exports = mongoose.model("User", userSchema);
