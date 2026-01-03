const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require("dotenv");
dotenv.config({ path: './.env' });

const multiplier = [

    0, 3.57, 4.76, 4.75, 7.08, 7, 9.2, 9, 8.7, 8.4, 8.21, 8.17

]

const multtexts = multiplier.join(`x | `);

console.log("BOT_TOKEN loaded:", !!process.env.BOT_TOKEN);

const client = new Client({
    
    intents: [
        
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences
        
    ]
    
});

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {

    console.log(`Logged in as ${client.user.tag}`);

});

client.on("messageCreate", (message) => {

    const member = message.member;

    if(message.author.bot){

        return;

    }

    if(message.content === "!multipliers"){

        message.reply(`${multtexts}`);

    }

    if(message.content === "!status"){

        if(!member.presence || !member.presence.activities || member.presence.activities.length === 0){

            message.reply("You have no activities right now");
            return;

        }

        const activity = member.presence.activities[0];

        message.reply(`Current Activity: ${activity.name} - ${activity.details} - ${activity.state}`);

    }

    if(message.content.includes('/')){

        let amount = Number(message.content.slice(1));
    
        const temp = member.presence.activities[0];

        if(temp.name.includes("R.E.P.O.")){

            const match = temp.details.match(/\d+/);
            const level = match ? Number(match[0]) : null;

            if(level > 11){

                level = 11;

            }

            message.reply(`The max amount for this run is ${amount * multiplier[level]}`);

        }else{

            message.reply("You are not in a run buddy!");

        }

    }

});