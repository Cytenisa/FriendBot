import * as dotenv from "dotenv";
dotenv.config();

/* eslint-disable no-console */
import commando from 'discord.js-commando';
import path from 'path';

const client = new commando.Client({
    owner: '156828762548207616',
    commandPrefix: '!'
});

client
    .on('error', console.error)
    .on('warn', console.warn)
    .on('debug', console.log)
    .on('ready', () => {
        if (client) {
            console.log(`Client ready; logged in as ${client?.user?.username}#${client?.user?.discriminator} (${client?.user?.id})`);
        }
    })
    .on('disconnect', () => { console.warn('Disconnected!'); })
    // @ts-ignore
    .on('commandError', (cmd, err) => {
        if (err instanceof commando.FriendlyError) return;
        console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
    })
    // @ts-ignore
    .on('commandBlock', (msg, reason) => {

    })
    .on('commandPrefixChange', (guild, prefix) => {

    })
    .on('commandStatusChange', (guild, command, enabled) => {

    })
    .on('groupStatusChange', (guild, group, enabled) => {

    });


client.registry
    .registerGroup('sondages', 'Sondages')
    .registerDefaults()
    // .registerTypesIn(path.join(__dirname, 'types'))
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(process.env.TOKEN);