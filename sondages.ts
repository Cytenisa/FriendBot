import { CommandInteraction, Message, TextChannel } from 'discord.js'
import {emojis} from './emojis'

export async function avantOuApres(interaction: CommandInteraction, updateGamesMessage = false) {
    if (!interaction.replied) {
        await interaction.reply({ ephemeral: true, content: `C'est parti !` })
    }
    const channel = interaction.channel as TextChannel
    if (channel) {
        if (updateGamesMessage) {
            await channel.send(`*N'oubliez pas de mettre à jour vos jeux*`)
        }

        const message = await channel.send(`Avant ou après manger / les deux ? 🍔
${Object.entries(emojis.when).map(([icon, name]) => `${icon} ${name} !`).join('\n')}
        `)

        for (let [icon, name] of Object.entries(emojis.when)) {
            await message.react(icon)
        }
        return message
    }
}

export async function theGame(interaction: CommandInteraction) {
    const channel = interaction.channel as TextChannel
    if (!interaction.replied) {
        await interaction.reply({ ephemeral: true, content: `C'est parti !` })
    }
    if (channel) {
        const games = [
            ['☠️', 'Left for dead 2'],
            ['🧟', 'Killing Floor'],
            ['🎮','Core'],
            ['⚽', 'RL'],
            ['🏃', 'Fall Guys'],
            // ['⛏️', 'Minecraft'],
            ['✏️', 'Skribbl'],
            ['❔', 'Codename'],
            ['💣', 'KTANE'],
            // ['⚔️', 'Pummel'],
            //['👮', 'The Division'],
            // ['🧙', 'Destiny'],

        ]
        const message = await channel.send(`Quel jeu ? 🎮

${Object.entries(emojis.game).map(([icon, name]) => `${icon} ${name}`).join('\n')}

        `)
        for (let [icon, name] of Object.entries(emojis.game)) {
            await message.react(icon)
        }

        return message
    }
}