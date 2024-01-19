const {
    prefix,
  } = require('../config.json')
const { Permissions } = require('discord.js')
  const SBSchema = require('../schemas/setBump.js')
  const cache = new Map()
  // An async function to load the data
  const loadData = async () => {
    // Get all stored channel IDs
    const results = await SBSchema.find({})
    // Loop through them all and set them in our map
    for (const result of results) {
      cache.set(result._id, result.channelId)
    }
  }
  // Invoke this function when the bot starts up
  loadData()
  module.exports = async (client) => {
    client.on('messageCreate', async message => {
      if (message.content === `${prefix}setBumpChannel`) {
      if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      // Destructure the guild and channel properties from the message object
      const { guild, channel } = message
      // Use find one and update to either update or insert the
      // data depending on if it exists already
      await SBSchema.findOneAndUpdate(
        {
          _id: guild.id,
        },
        {
          _id: guild.id,
          channelId: channel.id,
        },
        {
          upsert: true,
        }
      )
      // Store the information in the cache
      cache.set(guild.id, channel.id)
      message.reply(`The bumps channel has been set to <#${channel.id}>!`)
      } else return message.reply(`Your permissions are too low!`)
      }
    });

    client.on('messageCreate', async message => {
      if (message.content === `${prefix}removeBumpChannel`) {
        if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
          const guildID = await SBSchema.findOne({ _id: message.guild.id})
          if (message.guild.id === guildID?._id) {
            await guildID.delete()
            message.channel.send(`The bump channel setting has been successfully removed from the database. Please note that the settings may take some time to come into effect.`)
            
          }
        } else return message.reply('Your permissions are too low!')
      }
    })
  
  }
  module.exports.getChannelId = (guildId) => {
    return cache.get(guildId)
  }