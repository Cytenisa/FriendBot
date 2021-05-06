import Commando, { Client, CommandoMessage } from 'discord.js-commando';
import { theGame } from '../../sondages';

export default class AddNumbersCommand extends Commando.Command {
    constructor(client: Client) {
        super(client, {
            name: 'thegame',
            group: 'sondages',
            memberName: 'thegame',
            description: 'demande si joue avant ou après',
            examples: ['oui ou non'],

        });
    }

    async run(msg: CommandoMessage, { options }: { options: string[] }) {
        console.log(options)

        await theGame(msg)

        return msg;
    }
};