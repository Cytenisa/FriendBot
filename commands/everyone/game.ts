import Commando, { Client, CommandoMessage } from 'discord.js-commando';

export default class AddNumbersCommand extends Commando.Command {
    constructor(client: Client) {
        super(client, {
            name: 'game',
            group: 'sondages',
            memberName: 'game',
            description: 'demande si on joue ou non',
            examples: ['oui ou non'],

        });
    }

    async run(msg: CommandoMessage, { options }: { options: string[] }) {
        console.log(options)
        const message = await msg.channel.send(`Voulez-vous jouer ce soir ? 😀`)
        await message.react('👍')
        await message.react('👎')
        return msg;
    }
};