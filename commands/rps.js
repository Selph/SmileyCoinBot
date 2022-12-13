import { SlashCommandBuilder } from 'discord.js';

export const RPSCommand = new SlashCommandBuilder()
	.setName('RPS')
	.setDescription('Plays Rock, Paper, Scissors')
	.addStringOption((option) =>
		option
			.setName('hand')
			.setDescription('Your move, rock, paper or scissors')
	)
	.toJSON();

export function RPSInteraction(interaction) {
	const hands = ['rock', 'paper', 'scissors'];
	const pHand = interaction.options.getString('hand').toLowerCase();
	const cHand = Math.floor(Math.random() * 3);
	const PI = hands.indexOf(pHand);
	let message =
		'you played a hand never before seen, try again with one of the classics please';

	if ((PI + 2) % 3 === cHand) {
		message = `You bested me by playing ${pHand} agains my ${hands[cHand]}`;
	} else if (PI === cHand) {
		message = `We stand here as equals after both playing ${pHand}`;
	} else if ((cHand + 2) % 3 === PI) {
		message = `You never stood a chance, playing your ${pHand} against my ${hands[cHand]}, rookie mistake!`;
	}
	interaction.reply({ content: message });
}
