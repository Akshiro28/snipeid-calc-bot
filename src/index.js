"use strict"

const dotenv = require("dotenv");
const Discord = require("discord.js");
const counter = require("./utils/counter.js");
const parser = require("./utils/parser.js");

dotenv.config();
const client = new Discord.Client({ intents: [ "GUILDS", "GUILD_MESSAGES" ]});

const BATHBOT_USER_ID = "297073686916366336";

client.on("ready", async () => await onStartup());
client.on("messageCreate", async (msg) => await onNewMessage(msg))

async function onStartup() {
  console.log("SnipeID is now running.");

  const channel = await client.channels.cache.get(process.env.CHANNEL_ID);
}

async function onNewMessage(msg) {
  const channel = await client.channels.cache.get(process.env.CHANNEL_ID);

  if(msg.channelId === process.env.CHANNEL_ID) {
    if(msg.author.id === BATHBOT_USER_ID) {
      // await channel.send("Calculating score...");
      const embeds = msg.embeds; // always 0
      const len = embeds.length;
      const index = embeds.findIndex(
        embed => embed.title.toLowerCase()
          .startsWith("in how many top x map leaderboards is")
      );

      if(index === -1) {
        return;
      }

      console.log("[LOG] Calculating points data.");

      const desc = embeds[index].description;

      // [ top_1, top_8, top_15, top_25, top_50 ]
      const topCounts = parser(desc);
      
      console.log(topCounts);
    }
  }
}

client.login(process.env.BOT_TOKEN);
