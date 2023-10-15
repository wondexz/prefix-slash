const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

var prefix = config.prefix
var token = config.token
var owner = config.owner

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`${client.user.tag} olarak discord apisine bağlantı başarılı.`);
});

client.on('messageCreate', (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Komutu çalıştırırken bir hata oluştu!');
  }
});
// slash commands

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (!client.commands.has(commandName)) return;

  try {
    await client.commands.get(commandName).execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Komutu çalıştırırken bir hata oluştu!', ephemeral: true });
  }
});
// slash commands 
client.login(config.token);