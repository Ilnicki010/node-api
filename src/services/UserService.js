import randtoken from 'rand-token'
import axios from 'axios'
class UserService {
  constructor(client) {
    this.client = client
  }
  get collection() {
    return this.client.db('app').collection('users')
  }
  getRandomName() {
    return axios
      .get('https://uinames.com/api/')
      .then(function(response) {
        console.log(response)
        return response.data
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  async getAllUsers() {
    return await this.collection.find({}).toArray()
  }

  async getUserByToken(token) {
    //let index = this.users.indexOf(token)
    let user = await this.collection
      .find({
        token: token,
      })
      .toArray()
    console.log(user)
    return user
  }
  async signup(name) {
    const userData = {
      name: name,
      token: `${name.toUpperCase()}-${randtoken.generate(32)}`,
    }
    await this.collection.insertOne(userData)
    return userData
  }
  signin(token) {
    return this.getUserByToken(token)
  }
  async signout(token) {
    const user = this.getUserByToken(token)
    if (user) await this.collection.deleteOne(user)
  }
}
export default UserService
