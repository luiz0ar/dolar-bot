require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const axios = require('axios');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Message, Partials.Channel, Partials.GuildMember]
});

const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

client.once('ready', () => {
    console.log(`Bot está online como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.toLowerCase() === '/dolar') {
        try {
            const response = await axios.get(API_URL);
            const valorDolar = response.data.rates.BRL;
            message.reply(`💵 O valor atual do dólar é **R$ ${valorDolar.toFixed(2)}**.`);
        } catch (error) {
            console.error('Erro ao buscar cotação:', error);
            message.reply('❌ Ocorreu um erro ao buscar a cotação do dólar.');
        }
    }

    if (message.content.toLowerCase() === '/euro') {
        try {
            const response = await axios.get(API_URL);
            const valorEuro = response.data.rates.EUR * response.data.rates.BRL;
            message.reply(`💶 O valor atual do euro é **R$ ${valorEuro.toFixed(2)}**.`);
        } catch (error) {
            console.error('Erro ao buscar cotação:', error);
            message.reply('❌ Ocorreu um erro ao buscar a cotação do euro.');
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
