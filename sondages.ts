import { CommandInteraction, Message, TextChannel } from 'discord.js'

export async function avantOuApres(interaction: CommandInteraction) {
    if (!interaction.replied) {
        await interaction.reply(`C'est parti !`, { ephemeral: true })
    }
    const channel = interaction.channel as TextChannel
    if (channel) {
        const message = await channel.send(`Avant manger ou après manger ? 🍔
    🍝 Avant !
    🍽️ Après !
    `)
        await message.react('🍽️')
        await message.react('🍝')
    }
}

export async function theGame(interaction: CommandInteraction) {
    const channel = interaction.channel as TextChannel
    if (!interaction.replied) {
        await interaction.reply(`C'est parti !`, { ephemeral: true })
    }
    if (channel) {
        const message = await channel.send(`Quel jeu ? 🎮
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
    }
}