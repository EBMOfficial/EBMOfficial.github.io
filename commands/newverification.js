const { prefix } = require('../config.json')
const Discord = require('discord.js')
const { Permissions } = require('discord.js')
const moment = require('moment')

module.exports = async (client) => {
  client.on('messageReactionAdd', async (crowdreaction, crapuser) => {
    const BoomerHaven = client.guilds.cache.get("597676585058828300")
    const ModChannelOne = client.channels.cache.get("597686739318079489") 
const ModChannelThree = crowdreaction.message.guild.channels.cache.get("742806434810691585");
    const ModChannelFour = crowdreaction.message.guild.channels.cache.get("1103771372209057862")
    if (crowdreaction.emoji.name === "✅") {
      if (crowdreaction.message.channel === ModChannelThree) {
        const VerificationMSG = await ModChannelFour.send(`Dear ${crapuser.username}, thank you for submitting your verification request to the moderation team. We will get back to you as soon as possible.`)
          if (crowdreaction.message.guild.id === '597676585058828300') {
      client.guilds.fetch(crowdreaction.message.guild.id).then((server) => {
    server.members.fetch(crapuser.id).then((memberTarget) => {
        memberTarget.setNickname(`${crapuser.username} ✅`).catch((err) => console.log(err));
          const VerifiedRole = crowdreaction.message.guild.roles.cache.get('812689325301039125')
        memberTarget.roles.add(VerifiedRole)
    });
});
             const ModChannelEmbed = new Discord.MessageEmbed()
              .setTitle(`${crapuser.username} is currently seeking approval in the verification channel.`)
              .setDescription('Are they compatible for approval, or not?')
              const ModChannel = client.channels.cache.get("597686739318079489") 
               const MessageSend = await ModChannel.send({embeds: [ModChannelEmbed]})
                          MessageSend.react("☑️")
                          MessageSend.react("❎")
                          MessageSend.react("📋")
              if (crowdreaction.message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                client.on('messageReactionAdd', async (reaction, user) => {
                  if (!reaction.message.guild) return;
                      if (user.id === client.user.id) return;
                      if (reaction.emoji.name === "☑️") {
                         client.guilds.fetch(crowdreaction.message.guild.id).then(async(server) => {
    server.members.fetch(crapuser.id).then(async(memberTarget) => {
       const AV = reaction.message.guild.roles.cache.get('740852967577747537')
                       await  memberTarget.roles.add('811967492519100416')
                        await  memberTarget.roles.add("814494183993638932")
                        await  memberTarget.roles.remove(AV)
    });
                        return ModChannelFour.send(`<@${crapuser.id}>, your verification request has been approved! Enjoy your time in the Boomer Incorporated!`)
                            .then(async msg => {
                                if (crowdreaction.message.channel.type === "text") await msg.delete({ timeout: 5000 });
                            });
                          })
                      } else if (reaction.emoji.name === '❎') {
                          ModChannelFour.send(`<@${crapuser.id}>, Your application has been denied.`)
                        const ModChannel = client.channels.cache.get("597686739318079489") 
                        ModChannel.send('This user has been denied from joining the server.')
                      } else if (reaction.emoji.name === '📋') {
                         const userFlags = (await crapuser.fetchFlags()).toArray();
                           const activities = [];
                           let customStatus;
                        client.guilds.fetch(crowdreaction.message.guild.id).then((server) => {
    server.members.fetch(crapuser.id).then((memberTarget) => {
         const uiembed = new Discord.MessageEmbed() 
                             .setTitle(`${memberTarget.displayName}'s Information`)
                             .setThumbnail(`${memberTarget.displayAvatarURL({ dynamic: true })}`)
                             .addField('User', `${memberTarget}`, true)
                             .addField('Discriminator', `#${memberTarget.discriminator}`, true)
                             .addField('ID', `${memberTarget.id}`, true)
                             .addField('Bot', `${memberTarget.bot}`, true)
                             .addField('Color Role', `${memberTarget.roles.color}` || '`None`', true)
                             .addField('Highest Role', `${memberTarget.roles.highest}`, true)
                             .addField('Joined server on', `${moment(memberTarget.joinedAt).format('MMM DD YYYY')}`, true)
                             .addField('Joined Discord on', `${moment(memberTarget.createdAt).format('MMM DD YYYY')}`, true)
                             .setTimestamp()
                             .setColor(`${memberTarget.displayHexColor}`);
                        const ModChannel = client.channels.cache.get("597686739318079489") 
                           ModChannel.send({embeds: [uiembed]});
    })
    });
              
    
  

  
                      }
                });
                      } else return;
            } else if (reaction.emoji.name === '❌') {
              ModChannelFour.send(`<@${crapuser.id}>, your verification process has been terminated.`)
            }
        }
        
      }
      

    
  })
}