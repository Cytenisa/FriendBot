import { CommandInteraction, Emoji, Interaction, Message, MessageReaction, ReactionEmoji, ReactionManager, TextChannel, User } from 'discord.js';
import Commando, { Client, CommandoMessage } from 'discord.js-commando';
import CONSTANTS from '../../constant'
import { theGame, avantOuApres } from '../../sondages'

import dayjs from 'dayjs'
import * as locale from 'dayjs/locale/fr'
dayjs.locale(locale)

/* export default class AddNumbersCommand extends Commando.Command {
    constructor(client: Client) {
        super(client, {
            name: 'game',
            group: 'sondages',
            memberName: 'game',
            description: 'demande si on joue ou non',
            examples: ['oui ou non'],

        });
    }
}; */

export const game = async (interaction: CommandInteraction) => {
    const channel = interaction.channel as TextChannel

    await interaction.reply({ content: `C'est parti !`, ephemeral: true })

    await channel.send(`Demande de ${interaction.member.user.username} le ${dayjs().format('dddd DD MMMM')}`)
    const message = await channel.send(`Voulez-vous jouer ce soir ? 😀`)
    await channel.send(`*N'oubliez pas de mettre à jour vos jeux*`)

    await message.react('👍')
    await message.react('👎')

    const timeout = setInterval(async () => {
        let allVotes = new Map<string, string>()

        const reactions = [...message.reactions.cache.values()]
        reactions.forEach((r) => {
            const users = [...r.users.cache.values()]

            users.forEach(user => {
                if (user.id === '839546069759164426') {
                    return
                }
                if (!allVotes.has(user.id)) {
                    if (r.emoji.name) {
                        allVotes.set(user.id, r.emoji.name)
                    }
                }
            })
        })

        // if (
        //      (
        //          allVotes.has(CONSTANTS.Cytenisa)
        //      ) || (
        //          allVotes.has(CONSTANTS.Armaldio)
        //      )
        // ) {
        if (
            (
                allVotes.has(CONSTANTS.Nashento) || allVotes.has(CONSTANTS.Framboyse)
            ) && (
                allVotes.has(CONSTANTS.Armaldio) || allVotes.has(CONSTANTS.Cytenisa)
            )
        ) {

            const yes = Array.from(allVotes.values()).filter(emoji => emoji === '👍').length
            const no = Array.from(allVotes.values()).filter(emoji => emoji === '👎').length

            console.log('yes')
            console.log('no')

            clearInterval(timeout)
            if (no === 0) {
                await avantOuApres(interaction, false)
                await theGame(interaction)
            } else {
                await channel.send(`Bonne soirée à vous ! :D`)
            }
        }
    }, 10 * 1000)

    setTimeout(() => {
        clearInterval(timeout)
    }, 2 * 3600 * 1000)

    return interaction;
}