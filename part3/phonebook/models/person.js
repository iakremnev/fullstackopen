import mongoose from "mongoose";

const uri = process.env.MONGODB_URI

mongoose.connect(uri, {family: 4})

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: String
})
PersonSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = new mongoose.model('Person', PersonSchema)

export default Person
