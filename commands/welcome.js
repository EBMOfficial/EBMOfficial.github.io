// add custom thalapathy vijay welcome banner for the boomer inc
const {
   prefix,
} = require('../config.json')
const Canvas = require('canvas')
const { createCanvas, loadImage } = require("canvas");
const { registerFont } = require('canvas');
registerFont('./commands/Oswald-Light.ttf', { family: 'FontName' });
const { MessageAttachment } = require('discord.js')
const path = require('path')
   const { getChannelId } = require('../schemas/settingWelcome.js')
const GIMGSchema = require('../schemas/setGreetingIMG.js')
const GTXTSchema = require('../schemas/setGreetingTXT.js')

module.exports = async (client) => {
  
  //client.on('messageCreate', async (message) => {
   // if (message.content.startsWith(`${prefix}setGreetingbackground`)) {
       // const img = message.attachment.url
       // if (img.size/700/250) {
           //message.reply("https://media.tenor.com/FGit4U3jFEIAAAAC/lalo-salamanca-better-call-saul.gif")
     // } else message.reply(`Where's the text? What is this? This chicanery? What a sick joke!`)
       // message.channel.send('https://tenor.com/view/better-call-saul-chuck-mcgill-chicanery-breakdown-gif-25422432')
    //}

    
  //})
  client.on('guildMemberAdd', async (member) => { 
    const TBI = client.guilds.cache.get("597676585058828300")
    if (member.guild === (TBI)) {
    const AV = member.guild.roles.cache.get('740852967577747537')
    member.roles.add(AV)
    }
  })
    
    client.on('guildMemberAdd', async (member) => {
      const GreetingImage = await GIMGSchema.findOne({guildid: member.guild.id})
    // Async function
    // Destructure the guild property from the member object
    const { guild } = member
    // Access the channel ID for this guild from the cache
    const channelId = getChannelId(guild.id)
    // Access the actual channel and send the message
    const channel = guild.channels.cache.get(channelId)
    // Create a canvas and access the 2d context
    const canvas = Canvas.createCanvas(700, 250)
    const ctx = canvas.getContext('2d')
    // Load the background image and draw it to the canvas
    const background = await Canvas.loadImage(GreetingImage.imageurl)
    const background2 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/706933134368964608/1103784758225408030/7oDreeSPk8gAAAABJRU5ErkJggg.png")
    if (GreetingImage) {
      let x = 0
    let y = 0
    ctx.drawImage(background, x, y)
    // Load the user's profile picture and draw it
    const pfp = await Canvas.loadImage(
      member.user.displayAvatarURL({
        format: 'png',
      })
    )
    x = canvas.width / 2 - pfp.width / 2
    y = 25
    ctx.drawImage(pfp, x, y)
    // Display user text
    ctx.fillStyle = '#ffffff' // White text
    ctx.font = '35px sans-serif'
    let text = `Welcome ${member.user.tag}!`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 60 + pfp.height)
    // Display member count
    ctx.font = '30px sans-serif'
    text = `Members now: ${guild.memberCount}`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 100 + pfp.height)
    // Attach the image to a message and send it
    } else {
    let x = 0
    let y = 0
    ctx.drawImage(background2, x, y)
    // Load the user's profile picture and draw it
    const pfp = await Canvas.loadImage(
      member.user.displayAvatarURL({
        format: 'png',
      })
    )
    x = canvas.width / 2 - pfp.width / 2
    y = 25
    ctx.drawImage(pfp, x, y)
    // Display user text
    ctx.fillStyle = '#ffffff' // White text
    ctx.font = '35px sans-serif'
    let text = `Welcome ${member.user.tag}!`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 60 + pfp.height)
    // Display member count
    ctx.font = '30px sans-serif'
    text = `Member #${guild.memberCount}`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 100 + pfp.height)
    // Attach the image to a message and send it
    }
    const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png')
      if (member.id === client.user.id) return;
      else {
        const GreetingText = await GTXTSchema.findOne({guildid: member.guild.id})
        if (GreetingText) {
    channel.send(`${GreetingText.greetingtext}`)
        } else {
          channel.send(`Hey <@${member.id}>, Welcome to ${member.guild}! On behalf of the members of this server, I wish you a warm welcome!`)
        }
    channel.send({files: [attachment]})
      }
      
  })
       
         client.on('guildMemberRemove', async (member) => {
      const GreetingImage = await GIMGSchema.findOne({guildid: member.guild.id})
    // Async function
    // Destructure the guild property from the member object
    const { guild } = member
    // Access the channel ID for this guild from the cache
    const channelId = getChannelId(guild.id)
    // Access the actual channel and send the message
    const channel = guild.channels.cache.get(channelId)
    // Create a canvas and access the 2d context
    const canvas = Canvas.createCanvas(700, 250)
    const ctx = canvas.getContext('2d')
    // Load the background image and draw it to the canvas
    const background = await Canvas.loadImage(GreetingImage.imageurl)
    const background2 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/706933134368964608/1103784758225408030/7oDreeSPk8gAAAABJRU5ErkJggg.png")
    if (GreetingImage) {
      let x = 0
    let y = 0
    ctx.drawImage(background, x, y)
    // Load the user's profile picture and draw it
    const pfp = await Canvas.loadImage(
      member.user.displayAvatarURL({
        format: 'png',
      })
    )
    x = canvas.width / 2 - pfp.width / 2
    y = 25
    ctx.drawImage(pfp, x, y)
    // Display user text
    ctx.fillStyle = '#ffffff' // White text
    ctx.font = '35px sans-serif'
    let text = `Goodbye ${member.user.tag}!`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 60 + pfp.height)
    // Display member count
    ctx.font = '30px sans-serif'
    text = `Members now: ${guild.memberCount}`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 100 + pfp.height)
    // Attach the image to a message and send it
    } else {
    let x = 0
    let y = 0
    ctx.drawImage(background2, x, y)
    // Load the user's profile picture and draw it
    const pfp = await Canvas.loadImage(
      member.user.displayAvatarURL({
        format: 'png',
      })
    )
    x = canvas.width / 2 - pfp.width / 2
    y = 25
    ctx.drawImage(pfp, x, y)
    // Display user text
    ctx.fillStyle = '#ffffff' // White text
    ctx.font = '35px sans-serif'
    let text = `Goodbye ${member.user.tag}!`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 60 + pfp.height)
    // Display member count
    ctx.font = '30px sans-serif'
    text = `Member #${guild.memberCount}`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 100 + pfp.height)
    // Attach the image to a message and send it
    }
    const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png')
      if (member.id === client.user.id) return;
      else {
        const GreetingText = await GTXTSchema.findOne({guildid: member.guild.id})
        if (GreetingText) {
    channel.send(`${GreetingText.goodbyetext}`)
        } else {
          channel.send(`Goodbye <@${member.id}>!`)
        }
    channel.send({files: [attachment]})
      }
      
  })
        
   }