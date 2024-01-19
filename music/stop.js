const { prefix } = require('../config.json')
module.exports = async (client) => {
  client.on('messageCreate', async message => {
  if (message.content === `${prefix}stop`) {
    if (message.member.voice.channel) {
     const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, There is no music currently playing!. ❌` });

        queue.destroy();

        message.channel.send({ content: `The music playing on this server has been turned off, see you next time ✅` });
  } else return message.reply('You are not in a voice channel!')
  }
    })
  
}
