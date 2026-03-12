import mongoose from "mongoose";

const uri = process.env.MONGODB_URI

mongoose.connect(uri, {family: 4})

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        return v.length >= 8 && /\d{2,3}-\d+/.test(v)
      },
      message: props => `${props.value} is not a valid phone number`
    },
    requeired: true
  }
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
