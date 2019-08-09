const mongoose = require('mongoose')
const http = require('http')

console.log('====> APP Version is 2 <====')

// Connect
const mongoConnStr = `mongodb://testuser:test@${process.env.address}:${process.env.port}/test-db`
mongoose.connect(mongoConnStr, {useNewUrlParser: true})

const db = mongoose.connection
db.on('error', console.error)
db.once('open', () => {
  console.log('Connection success!')
})

// Create Schema/Model
const schema = new mongoose.Schema({
  value: Number
})
const model = mongoose.model('Test', schema)

const obj = new model({ value: Math.random() + 20 })
console.log(`Generated value: ${obj.value}`)

// Save
obj.save(err => {
  if (err) {
    return console.error(`Error while saving: ${err}`)
  }
  console.log(`Saved value: ${obj.value}`)
})

// Find
model.find((err, values) => {
  if (err) {
    return console.error(`Error while finding: ${err}`)
  }
  console.log(`Found value: ${values}`)
})

http.createServer((_, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.write(`Test Server to keep container runnin'!`)
  res.end()
}).listen(8080)
