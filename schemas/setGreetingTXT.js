const { Schema, model } = require('mongoose')
// We are using this multiple times so define
// it in an object to clean up our code
const GTXTSchema = Schema({
  guildid: String, // Guild ID
  greetingtext: String, // text
  goodbyetext: String, // text
})
module.exports = model('greetingtxt', GTXTSchema)