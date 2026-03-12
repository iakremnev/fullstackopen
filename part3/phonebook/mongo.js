import mongoose from 'mongoose'


if (process.argv.length !== 2 && process.argv.length !== 4) {
  console.log(`Usage:
    add a person to phonebook - node mongo.js <person> <number>
    view phonebook - node mongo.js`
  )
  process.exit(1)
}

const addPeronSubcommand = () => {
  const personName = process.argv[2]
  const personNumber = process.argv[3]

  const person = new Person({
    name: personName,
    number: personNumber,
  })

  person.save().then(result => {
    console.log('person saved')
    console.log(result)
    mongoose.connection.close()
  })
}

const viewPersonListSubcommand = () => {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

const uri = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(uri, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 2) {
  viewPersonListSubcommand()
}
else {
  addPeronSubcommand()
}
