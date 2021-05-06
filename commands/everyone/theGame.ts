import Commando, { Client, CommandoMessage } from 'discord.js-commando';

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
        const message = await msg.channel.send(`Quel jeu ? 🎮
⚽ RL
🏃 Fall Guys
⛏️ Minecraft
✏️ Skribbl
⚔️ Pummel
👮 The Division
🧙 Destiny
🧟 WWZ
`)
        await message.react('⚽')
        await message.react('🏃')
        await message.react('⛏️')
        await message.react('✏️')
        await message.react('⚔️')
        await message.react('👮')
        await message.react('🧙')
        await message.react('🧟')
        return msg;
    }
};