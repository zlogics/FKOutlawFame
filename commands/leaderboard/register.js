const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const idreg = require('../../model/idreg');
const { PlayFab } = require('playfab-sdk');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Digite o nome do outlaw que praticou o Halt')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('Registers your PlayfabID to the regional Leaderboard')
				.setMaxLength(16)
				.setMinLength(14)
				.setRequired(true)),

	async execute(interaction) {
		const id = interaction.options._hoistedOptions[0].value
		let exist = await mongoose.models.idsdb.findOne({PlayfabID: id}).lean()

		if (!exist) {
			new idreg({
				PlayfabID: id,
				MMR: '0',
				Nome: 'registrando'
			}).save()
			await interaction.reply(`${id} Registered!`);
		}
		else await interaction.reply(`${id} Already registered!`);
	},
};