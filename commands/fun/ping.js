const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Check if bot is working'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};