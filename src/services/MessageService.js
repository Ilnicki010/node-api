import path from 'path'
const fs = require('fs')
class MessageService {
  constructor(client) {
    this.client = client
  }
  async getUserByToken(token) {
    //let index = this.users.indexOf(token)
    let user = await this.usersCollection.findOne({
      token: token,
    })
    console.log(user)
    return user
  }
  get messagesCollection() {
    return this.client.db('app').collection('messages')
  }
  get usersCollection() {
    return this.client.db('app').collection('users')
  }

  async getAllMessages() {
    return await this.messagesCollection.find({}).toArray()
  }

  async postNewMessage(token, content, img = null) {
    const author = await this.getUserByToken(token)
    console.log(author)
    console.log(token)
    const message = {
      content: content,
      author: author.name,
      img: null,
    }
    if (img) {
      console.log('img')
      const hash = Date.now().toString()
      const uploadName = `${hash}_${author.name}`

      message.img = uploadName

      const filePath = path.join(__dirname + '../../../public/uploads', uploadName)
      fs.writeFile(filePath, img.data, function() {
        console.log('File saved to', filePath)
      })
    }
    await this.messagesCollection.insertOne(message)
    return message
  }
}
export default MessageService
