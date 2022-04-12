import { CommandInteraction, Emoji, Interaction, Message, MessageReaction, ReactionEmoji, ReactionManager, TextChannel, User } from 'discord.js';
import Commando, { Client, CommandoMessage } from 'discord.js-commando';
import CONSTANTS from '../../constant'
import { theGame, avantOuApres, WhenTime } from '../../sondages'
import {emojis} from '../../emojis'

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

   const creator = interaction.user.id

    await interaction.reply({ content: `C'est parti !`, ephemeral: true })

    await channel.send(`Demande de ${interaction.member.user.username} le ${dayjs().format('dddd DD MMMM')}`)
    const message = await channel.send(`Voulez-vous jouer ? 😀`)
    

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

        if (
            (
               (creator === CONSTANTS.Cytenisa || creator === CONSTANTS.Armaldio) &&
                allVotes.has(CONSTANTS.Nashento) || allVotes.has(CONSTANTS.Framboyse)
            ) || (
                (creator === CONSTANTS.Nashento || creator === CONSTANTS.Framboyse) &&
                allVotes.has(CONSTANTS.Cytenisa) || allVotes.has(CONSTANTS.Armaldio)
            ) || (
                (creator === CONSTANTS.Cytenisa || creator === CONSTANTS.Armaldio) &&
                allVotes.has(CONSTANTS.Cytenisa) || allVotes.has(CONSTANTS.Armaldio)
            ) 
            ){
            const yes = Array.from(allVotes.values()).filter(emoji => emoji === '👍').length
            const no = Array.from(allVotes.values()).filter(emoji => emoji === '👎').length

            clearInterval(timeout)
            if (no === 0) {
                const when = await avantOuApres(interaction, false)
                const time = await WhenTime(interaction)
                const game = await theGame(interaction)

                // timeout of 15 minutes
                setTimeout(async () => {
                    let whenString = ''
                    let gameString = ''
                    if  (when) {
                        const reactions = [...when.reactions.cache.values()]
                        const reactionsCount = reactions.map((r) => ({
                            count: r.count,
                            id: r.emoji.name
                        }))
                        .sort((a, b) => b.count - a.count)

                        //@ts-ignore
                        whenString = reactionsCount[0].id + ' ' + emojis.when[reactionsCount[0].id]

                        console.log('when reactionsCount', reactionsCount)
                    }

                    if (game) {
                        const reactions = [...game.reactions.cache.values()]
                        const reactionsCount = reactions.map((r) => ({
                            count: r.count,
                            id: r.emoji.name
                        }))
                        .sort((a, b) => b.count - a.count)

                        gameString = reactionsCount.filter(
                            r => r.count === reactionsCount[0].count
                            //@ts-ignore
                         ).map(r => r.id + ' ' + emojis.game[r.id])
                         .join(', ') ?? '🤷'

                        console.log('game reactionsCount', reactionsCount)
                    }
                    //await channel.send(`*N'oubliez pas de mettre à jour vos jeux*`)
                    await channel.send(`Nous jouerons donc a ${gameString}, ${whenString}`)
                }, 15 * 60 * 1000)
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