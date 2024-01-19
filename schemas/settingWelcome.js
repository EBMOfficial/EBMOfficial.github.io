const {
    prefix,
  } = require('../config.json')
const { Permissions } = require('discord.js')
  const SWSchema = require('./setWelcome.js')
  const cache = new Map()
  // An async function to load the data
  const loadData = async () => {
    // Get all stored channel IDs
    const results = await SWSchema.find({})
    // Loop through them all and set them in our map
    for (const result of results) {
      cache.set(result._id, result.channelId)
    }
  }
  // Invoke this function when the bot starts up
  loadData()

const GIMGSchema = require('../schemas/setGreetingIMG.js')
const GTXTSchema = require('../schemas/setGreetingTXT.js')
  module.exports = async (client) => {
       const Discord = require('discord.js')
    client.on('message', async message => {
      if (message.content === `${prefix}setWelcomeChannel`) {
     if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      // Destructure the guild and channel properties from the message object
      const { guild, channel } = message
      // Use find one and update to either update or insert the
      // data depending on if it exists already
      await SWSchema.findOneAndUpdate(
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
      message.reply(`The welcome/goodbye channel has been set to <#${channel.id}>!`)
      } else return message.reply(`Your permissions are too low!`)
      }
    });

 async function greetingimageupdate(message) {
   const Discord = require('discord.js')
     const args = message.content.slice(prefix.length).trim().split(/ +/g);
      let text = args.join(" ");
            console.log(text.slice('setgreetingimage'.length))  
            const GreetingImage = await GIMGSchema.findOne({guildid: message.guild.id})
            if (GreetingImage) { 
              const ConfirmEmbed = new Discord.MessageEmbed()
              .setTitle(`There is already a greeting image set for this server! Do you want to replace it? Current image:`)
              .setImage(`${GreetingImage.imageurl}`)
              .setTimestamp()
              const ConfirmationMSG = await message.channel.send({embeds: [ConfirmEmbed]})
              ConfirmationMSG.react("✅")
              ConfirmationMSG.react("❌")
              const filter = (reaction, user) => {
        return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
    }; 
    
    ConfirmationMSG.awaitReactions({filter, max: 1, time: 60000, errors: ['time'] })
	.then(async collected => {
		const reaction = collected.first();
    
		if (reaction.emoji.name === '✅') { 
      const axios = require('axios')
      const sharp = require('sharp')
      const imageResponse = await axios({url: text.slice('setgreetingimage'.length), responseType: 'arraybuffer'});
const buffer = Buffer.from(imageResponse.data, 'binary');
let src = new sharp(buffer);
    await src.jpeg();
    const metadata = await src.metadata();//this was where it failed, but now it prints an object of metadata
    console.log(metadata);
      console.log(metadata.width)
      console.log(metadata.height)
                if (metadata.height === 250 || metadata.width === 700) {
                  await GIMGSchema.findOneAndUpdate({guildid: message.guild.id}, {imageurl: text.slice('setgreetingimage'.length) }, { upsert: true , new: true , setDefaultsOnInsert: true })
  
                  message.channel.send(`Success! The new greeting image has been set!`)
                } else message.reply(`Your image's dimensions need to be 700x250! (WidthxHeight) Check out https://www.simpleimageresizer.com/ if you want to resize your image (No sponsorship nonsense here, this was just the first search result.)`)
                } else if (reaction.emoji.name === '❌') {
                  message.channel.send(`Alright, this operation has been aborted.`)
                }

            })
            } else {
            const axios = require('axios')
      const sharp = require('sharp')
      const imageResponse = await axios({url: text.slice('setgreetingimage'.length), responseType: 'arraybuffer'});
const buffer = Buffer.from(imageResponse.data, 'binary');
let src = new sharp(buffer);
    await src.jpeg();
    const metadata = await src.metadata();//this was where it failed, but now it prints an object of metadata
    console.log(metadata);
      console.log(metadata.width)
      console.log(metadata.height)
                if (metadata.height === 250 || metadata.width === 700) {
                  await GIMGSchema.findOneAndUpdate({guildid: message.guild.id}, {imageurl: text.slice('setgreetingimage'.length) }, { upsert: true , new: true , setDefaultsOnInsert: true })
  
                  message.channel.send(`Success! The new greeting image has been set!`)
                } else message.reply(`Your image's dimensions need to be 700x250! (WidthxHeight) Check out https://www.simpleimageresizer.com/ if you want to resize your image (No sponsorship nonsense here, this was just the first search result.)`)
            }
            
  }

    client.on('messageCreate', async message => {
    
      if (message.content.startsWith(`${prefix}setGreetingText`)) {
        if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
           const args = message.content.slice(prefix.length).trim().split(/ +/g);
           let text = args.join(" ");
          const GreetingText = await GTXTSchema.findOne({guildid: message.guild.id})
          const ConfirmText = await message.channel.send(`Okay. Your text is:\n ${text.slice('setGreetingText'.length)}\n Is that correct?`)
          ConfirmText.react("✅")
              ConfirmText.react("❌")
              const filter = (reaction, user) => {
        return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
    }; 
    
    ConfirmText.awaitReactions({filter, max: 1, time: 60000, errors: ['time'] })
	.then(async collected => {
		const reaction = collected.first();
    
		if (reaction.emoji.name === '✅') { 
         await GTXTSchema.findOneAndUpdate({guildid: message.guild.id}, {greetingtext: text.slice('setGreetingText'.length) }, { upsert: true , new: true , setDefaultsOnInsert: true })
      message.channel.send(`All set!`)
    } else if (reaction.emoji.name === '❌') {
      message.channel.send(`Okay, this process has been aborted.`)
      
    }
  });
  
        } else return message.reply('Your permissions are too low!')
      }
    })

      client.on('messageCreate', async message => {
    
      if (message.content.startsWith(`${prefix}setGoodbyeText`)) {
        if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
           const args = message.content.slice(prefix.length).trim().split(/ +/g);
           let text = args.join(" ");
          const GreetingText = await GTXTSchema.findOne({guildid: message.guild.id})
          const ConfirmText = await message.channel.send(`Okay. Your text is:\n ${text.slice('setGoodbyeText'.length)}\n Is that correct?`)
          ConfirmText.react("✅")
              ConfirmText.react("❌")
              const filter = (reaction, user) => {
        return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
    }; 
    
    ConfirmText.awaitReactions({filter, max: 1, time: 60000, errors: ['time'] })
	.then(async collected => {
		const reaction = collected.first();
    
		if (reaction.emoji.name === '✅') { 
         await GTXTSchema.findOneAndUpdate({guildid: message.guild.id}, {goodbyetext: text.slice('setGoodbyeText'.length) }, { upsert: true , new: true , setDefaultsOnInsert: true })
      message.channel.send(`All set!`)
    } else if (reaction.emoji.name === '❌') {
      message.channel.send(`Okay, this process has been aborted.`)
      
    }
   });
        } else return message.reply('Your permissions are too low!')
      }
    })

    client.on('messageCreate', async message => {
      if (message.content === `${prefix}removeWelcomeChannel`) {
        if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
          const guildID = await SWSchema.findOne({ _id: message.guild.id})
          if (message.guild.id === guildID?._id) {
            await guildID.delete()
            message.channel.send(`The welcome channel setting has been successfully removed from the database. Please note that the settings may take some time to come into effect.`)
            
          }
        } else return message.reply('Your permissions are too low!')
      }
    })

    client.on('messageCreate', async message => {
      if (message.content.startsWith(`${prefix}currentgreetingimage`)) {
        const GreetingImage = await GIMGSchema.findOne({guildid: message.guild.id})
        if (GreetingImage) {
          const CheckEmbed = new Discord.MessageEmbed()
              .setTitle(`Here's the current greeting image of ${message.guild}!`)
              .setImage(`${GreetingImage.imageurl}`)
              .setTimestamp()
              message.channel.send({embeds: [CheckEmbed]})
        }
      }
    })
    client.on('messageCreate', async message => {
      if (message.content.startsWith(`${prefix}setgreetingimage`)) {
        if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
          if (message.attachments.size > 0) {
            return message.reply(`Please send the attachment URL of the image, not the image as an attachment.`)
      } else if (message.content.includes('.jpg')) {
            greetingimageupdate(message)
      } else if (message.content.includes('.png')) {
            greetingimageupdate(message)
      } else if (message.content.includes('.jpeg')) {
            greetingimageupdate(message)
      } else if (message.content.includes('.jfif')) {
           return message.reply(`That is not a valid format! Please use a PNG, JPG or JPEG file!`)
      } else if (message.content.includes('.mp4')) {
            return message.reply(`That is not a valid format! Please use a PNG, JPG or JPEG file!`)
      } else if (message.content.includes('.mov')) {
           return message.reply(`That is not a valid format! Please use a PNG, JPG or JPEG file!`)
      } else if (message.content.includes('.avi')) {
           return message.reply(`That is not a valid format! Please use a PNG, JPG or JPEG file!`)
      } else if (message.content.includes('.webm')) {
           return message.reply(`That is not a valid format! Please use a PNG, JPG or JPEG file!`)
      } else if (message.content.includes('.gif')) {
          return message.reply(`That is not a valid format! Please use a PNG, JPG or JPEG file!`)
      } else if (message.content.includes('https://www.tenor.com/view')) {
        return message.reply(`That is not a valid format! Please use a PNG, JPG or JPEG file!`)
      }
        }
      }
              
            
    })
  
  }
  module.exports.getChannelId = (guildId) => {
    return cache.get(guildId)
  }