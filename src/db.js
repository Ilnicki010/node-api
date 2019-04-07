import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.DB, {
  useNewUrlParser: true,
})

export { client }
