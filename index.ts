import * as dotenv from "dotenv";
dotenv.config();

/* eslint-disable no-console */
import commando from 'discord.js';
import { ApplicationCommandData, Intents } from 'discord.js'
import path from 'path';

import { game } from './commands/everyone/game'
import { play } from './commands/everyone/play'
import { thegame } from './commands/everyone/theGame'

const intents = new Intents([
    Intents.NON_PRIVILEGED,
    // "GUILD_MEMBERS",
    // "GUILD_PRESENCES"
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
                    name: 'game',
                    description: 'est-ce qu\'on joue ou non',
                    options: []
                },
                {
                    name: 'play',
                    description: 'avant ou après',
                    options: []
                },
                {
                    name: 'thegame',
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
    .on('interaction', async interaction => {
        if (!interaction.isCommand()) return;
        if (interaction.commandName === 'game') {
            await game(interaction)
            return;
        };
        if (interaction.commandName === 'play') {
            await play(interaction)
            return;
        };
        if (interaction.commandName === 'thegame') {
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

client.login(process.env.TOKEN);