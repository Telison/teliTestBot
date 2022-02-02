import { readdirSync } from "fs";
import { Client, Collection, Intents } from "discord.js";
import dotenv from "dotenv";

async function start() {
  dotenv.config();
  const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
  client.commands = await loadCommands();
  await registerEvents(client);
  client.login(process.env.DISCORD_TOKEN);
}

async function loadCommands() {
  const commands = new Collection();
  const commandFiles = readdirSync("./commands").filter((file) =>
    file.endsWith(".js")
  );

  for (const file of commandFiles) {
    const exports = await import(`./commands/${file}`);
    commands.set(exports.data.name, exports);
  }
  return commands;
}

async function registerEvents(client) {
  const eventFiles = readdirSync("./events").filter((file) =>
    file.endsWith(".js")
  );

  for (const file of eventFiles) {
    const exports = await import(`./events/${file}`);

    if (exports.once) {
      console.log(`Registering ${exports.name} as a once event`);
      client.once(exports.name, (...args) => exports.execute(...args));
    } else {
      console.log(`Registering ${exports.name} as an on event`);
      client.on(exports.name, (...args) => exports.execute(...args));
    }
  }
}

(async () => {
  try {
    await start();
  } catch (e) {
    console.error(e);
  }
})();
