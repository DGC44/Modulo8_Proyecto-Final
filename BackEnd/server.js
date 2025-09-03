const { MongoClient } = require('mongodb')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const app = express()
const port = 3000

app.use(express.json())
app.use(cors()) // CORS

const MONGODB_URI = dotenv.config().parsed.MONGODB_URI
const DB_NAME = dotenv.config().parsed.DB_NAME

const client = new MongoClient(MONGODB_URI)
const db = client.db(DB_NAME)
const todoCollection = db.collection('todos')


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/todos', async(req, res) => {
    const todos = await todoCollection.find().toArray()
    res.json(todos)
})

app.post('/todos', async(req, res) => {
    const newTodo = req.body.todo
    const result = await todoCollection.insertOne({ name: newTodo })

    console.log(result)

    res.json({
        _id : result.insertedId,
        name : newTodo
    })
})

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`)
    await client.connect()
})