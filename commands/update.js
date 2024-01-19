const { prefix } = require('../config.json')
const Discord = require('discord.js')
module.exports = async (client) => {
 client.on('message', async message => {
   if (message.author.id === '578634781781393419') {
     if (message.content === `${prefix}sendupdate`) {
  client.guilds.cache.forEach((guild) => {
     const UpdateEmbed = new Discord.MessageEmbed()
  .setTitle(`Hello users of ${guild}!`)
  .setURL(`https://www.youtube.com/watch?v=PuZ34IeY_L0&t=196s`)
  .setDescription(`AntiPhisher has been brought back as an experimental functionality.`)
  .setFooter('Changelog Hotfix v4.55')
  .setTimestamp()
  guild.systemChannel.send({embeds: [UpdateEmbed] })
  });
   }
   }
 });
}