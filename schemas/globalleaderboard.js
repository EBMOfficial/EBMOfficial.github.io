const { Schema, model } = require('mongoose')

const globalleaderboard = Schema({
  userid: String,
  points: Number,
  awards: Number,
  Global: String,

})

module.exports = model('globalleaderboard', globalleaderboard)
 