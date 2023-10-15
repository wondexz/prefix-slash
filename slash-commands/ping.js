const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Botun pingini ölçer.'),
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};
