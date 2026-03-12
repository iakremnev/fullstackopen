import mongoose from "mongoose";

const uri = process.env.MONGODB_URI

mongoose.connect(uri, {family: 4})

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = new mongoose.model('Person', PersonSchema)

export default Person
