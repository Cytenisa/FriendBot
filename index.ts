import * as dotenv from "dotenv";
dotenv.config();

/* eslint-disable no-console */
import commando, { TextChannel } from 'discord.js';
import { ApplicationCommandData, Intents } from 'discord.js'
import path from 'path';

import { game } from './commands/everyone/game'
import { play } from './commands/everyone/play'
import { thegame } from './commands/everyone/theGame'
import { whenTime } from './commands/everyone/whenTime'

// @ts-ignore
import { CronJob } from 'cron';

const intents = new Intents([
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
]);

const client = new commando.Client({
    // owner: '156828762548207616',
    // commandPrefix: '!',
    intents,
});

client
    .on('error', console.error)
    .on('warn', console.warn)
    .on('applicationCommandCreate', (command) => {
        console.log('registred', command.name)
    })
    // .on('debug', console.log)
    .on('ready', async () => {
        if (client) {
            console.log(`Client ready; logged in as ${client?.user?.username}#${client?.user?.discriminator} (${client?.user?.id})`);

            const commands: ApplicationCommandData[] = [
                {
                    name: 'play',
                    description: 'est-ce qu\'on joue ou non',
                    options: []
                },
                {
                    name: 'when',
                    description: 'Quand ?',
                    options: []
                },
                {
                    name: 'whenTime',
                    description: 'Dans combien de temps ?',
                    options: []
                },
                {
                    name: 'what',
                    description: 'quel jeu ?',
                    options: []
                }
            ]

            try {
                const command1 = await (client as any).guilds.cache.get('839542741549318154').commands.set(commands);
                const command2 = await (client as any).guilds.cache.get('690572002943172690').commands.set(commands);
            } catch (error) {
                console.log(error)
            }

        }
    })
    .on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
        if (interaction.commandName === 'play') {
            await game(interaction)
            return;
        };
        if (interaction.commandName === 'when') {
            await play(interaction)
            await whenTime(interaction)
            await thegame(interaction)
            return;
        };
        if (interaction.commandName === 'what') {
            await thegame(interaction)
            return;
        };

        console.log(interaction);
    })
    // @ts-ignore
    // .on('commandError', (cmd, err) => {
    //     if (err instanceof commando.FriendlyError) return;
    //     console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
    // })
    // @ts-ignore
    .on('commandBlock', (msg, reason) => {

    })
    .on('commandPrefixChange', (guild, prefix) => {

    })
    .on('commandStatusChange', (guild, command, enabled) => {

    })
    .on('groupStatusChange', (guild, group, enabled) => {

    });


// client.registry
//     .registerGroup('sondages', 'Sondages')
//     .registerDefaults()
//     // .registerTypesIn(path.join(__dirname, 'types'))
//     .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(
    process.env.TOKEN
).then(c => {
    const channel = client.channels.cache.get('880474479627743252') as TextChannel
    if (channel) {
        var job = new CronJob(
            '5 17 * * THU',
            async () => {
                await channel.send(`Les nouveaux jeux Epic sont disponibles !`)
            },
            null,
            true,
            'Europe/Paris'
        );
    } else {
        throw new Error('Channel not found')
    }
    
})