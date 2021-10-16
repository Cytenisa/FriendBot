import { CommandInteraction, Message, TextChannel } from 'discord.js'

export async function avantOuApres(interaction: CommandInteraction, updateGamesMessage = false) {
    if (!interaction.replied) {
        await interaction.reply(`C'est parti !`, { ephemeral: true })
    }
    const channel = interaction.channel as TextChannel
    if (channel) {
        if (updateGamesMessage) {
            await channel.send(`*N'oubliez pas de mettre à jour vos jeux*`)
        }

        const message = await channel.send(`Avant manger ou après manger ? 🍔
    🍝 Avant !
    🍽️ Après !
    `)
    await message.react('🍝')
    await message.react('🍽️')
    }
}

export async function theGame(interaction: CommandInteraction) {
    const channel = interaction.channel as TextChannel
    if (!interaction.replied) {
        await interaction.reply(`C'est parti !`, { ephemeral: true })
    }
    if (channel) {
        const games = [
            ['⚽', 'RL'],
            ['🏃', 'Fall Guys'],
            // ['⛏️', 'Minecraft'],
            ['✏️', 'Skribbl'],
            ['❔', 'Codename'],
            // ['⚔️', 'Pummel'],
            ['👮', 'The Division'],
            // ['🧙', 'Destiny'],
            ['🧟', 'WWZ'],
        ]
        const message = await channel.send(`Quel jeu ? 🎮

${games.map(([icon, name]) => `${icon} ${name}`).join('\n')}

        `)
        for (let [icon, name] of games) {
            await message.react(icon)
        }
    }
}