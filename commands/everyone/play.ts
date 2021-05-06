import Commando, { Client, CommandoMessage } from 'discord.js-commando';

export default class AddNumbersCommand extends Commando.Command {
    constructor(client: Client) {
        super(client, {
            name: 'play',
            group: 'sondages',
            memberName: 'play',
            description: 'demande si joue avant ou après',
            examples: ['oui ou non'],

        });
    }

    async run(msg: CommandoMessage, { options }: { options: string[] }) {
        console.log(options)
        const message = await msg.channel.send(`Avant manger ou après manger ? 🍔
🍽️ Avant ! 
🍝 Après ! 
`)
        await message.react('🍽️')
        await message.react('🍝')
        return msg;
    }
};