import { Message } from 'discord.js'
export async function avantOuApres(msg: Message) {
    const message = await msg.channel.send(`Avant manger ou après manger ? 🍔
🍝 Avant !
🍽️ Après !
`)
    await message.react('🍽️')
    await message.react('🍝')
}

export async function theGame(msg: Message) {
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
}