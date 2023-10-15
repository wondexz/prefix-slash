const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v13');
const { clientId, guildId, token } = require('./config.json');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./slash-commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./slash-commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Slash komutlarına kaydediliyor...');
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log('Slash komutları başarıyla kaydedildi!');
  } catch (error) {
    console.error(error);
  }
})();
