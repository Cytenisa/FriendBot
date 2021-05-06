import { Emoji, MessageReaction, ReactionEmoji, ReactionManager, User } from 'discord.js';
import Commando, { Client, CommandoMessage } from 'discord.js-commando';
import CONSTANTS from '../../constant'
import { theGame, avantOuApres } from '../../sondages'

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

        const timeout = setInterval(async () => {
            let allVotes = new Map<string, string>()

            const reactions = message.reactions.cache.array()
            // console.log('reactions', reactions)
            reactions.forEach((r) => {
                const users = r.users.cache.array()

                // console.log('users.length', users.length);

                users.forEach(user => {
                    // console.log('user.id', user.id)
                    if (user.id === '839546069759164426') {
                        return
                    }
                    if (!allVotes.has(user.id)) {
                        allVotes.set(user.id, r.emoji.name)
                    }
                })
            })

            if (
                (
                    allVotes.has(CONSTANTS.Nashento) || allVotes.has(CONSTANTS.Framboyse)
                ) && (
                    allVotes.has(CONSTANTS.Armaldio) || allVotes.has(CONSTANTS.Cytenisa)
                )
            ) {

                const yes = Array.from(allVotes.values()).filter(emoji => emoji === '👍').length
                const no = Array.from(allVotes.values()).filter(emoji => emoji === '👎').length

                clearInterval(timeout)
                if (no === 0) {
                    await avantOuApres(msg)
                    await theGame(msg)
                } else {
                    await msg.channel.send(`Hé bien passez une bonne soirée ! :D`)
                }
            }
        }, 10 * 1000)

        setTimeout(() => {
            clearInterval(timeout)
        }, 2 * 3600 * 1000)

        return msg;
    }
};