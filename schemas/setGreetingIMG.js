const { Schema, model } = require('mongoose')
// We are using this multiple times so define
// it in an object to clean up our code
const GIMGSchema = Schema({
  guildid: String, // Guild ID
  imageurl: String, // image url
})
module.exports = model('greetingimg', GIMGSchema)