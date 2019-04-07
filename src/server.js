import express from 'express'
import socketIO from 'socket.io'
import { client } from './db'
import fileUpload from 'express-fileupload'

const router = express.Router()
const PORT = process.env.PORT
const app = express()

// import postSignIn from './controllers/postSignIn.js';
// import postSignUp from './controllers/postSignUp.js';
// import postSignOut from './controllers/postSignOut.js';

import UserService from './services/UserService'
import MessageService from './services/MessageService'

const userService = new UserService(client)
const messageService = new MessageService(client)

app.use('/static', express.static('public'))
app.use(fileUpload())
app.use(express.json())

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
router.get('/messages', async (req, res) => {
  const messages = await messageService.getAllMessages()
  res.status(200).json(messages)
})
router.post('/messages', async (req, res) => {
  if (req.files.img) {
    const msg = await messageService.postNewMessage(req.body.token, req.body.content, req.files.img)
    res.status(200).json(msg)
  } else {
    const msg = await messageService.postNewMessage(req.body.token, req.body.content)
    res.status(200).json(msg)
  }
})

router.get('/users', async (req, res) => {
  console.log('hello')
  const users = await userService.getAllUsers()
  res.status(200).json(users)
})
router.get('/random-user', (req, res) => {
  userService.getRandomName().then(data => {
    res.status(200).json(data)
  })
})

router.post('/auth/signup/', (req, res) => {
  console.log(req.body.name)
  if (req.body.name) {
    res.status(200).json(userService.signup(req.body.name))
  } else {
    res.status(400).end()
  }
})

router.post('/auth/signin/', async (req, res) => {
  const results = await userService.signin(req.body.token)
  res.status(200).json(results)
})
router.post('/auth/signout/', (req, res) => {
  userService.signout(req.body.token)
  res.end()
})
// router.post('/auth/signout/:token', postSignOut)
client.connect(err => {
  app.use(router)
  const server = app.listen(PORT, () => {
    console.log('Server started on port: ' + PORT)
  })

  const io = socketIO.listen(server)
  io.on('connection', socket => {
    console.log('User connected')
    socket.on('disconnect', function() {
      console.log('User disconnected')
    })
    socket.on('chat message', data => {
      io.emit('chat message', data)
    })
  })
})
