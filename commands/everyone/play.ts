import { CommandInteraction } from 'discord.js';
import Commando, { Client, CommandoMessage } from 'discord.js-commando';
import { avantOuApres } from '../../sondages';

/* export default class AddNumbersCommand extends Commando.Command {
    constructor(client: Client) {
        super(client, {
            name: 'play',
            group: 'sondages',
            memberName: 'play',
            description: 'demande si joue avant ou après',
            examples: ['oui ou non'],

        });
    }
}; */

export const play = async (interaction: CommandInteraction) => {
    await avantOuApres(interaction, true)

    return interaction;
}