import { readdirSync } from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import dotenv from "dotenv";

(async () => {
  dotenv.config();

  try {
    console.log("registering commands");
    const commands = [];
    const commandFiles = readdirSync("./commands").filter((file) =>
      file.endsWith(".js")
    );

    for (const file of commandFiles) {
      const exports = await import(`./commands/${file}`);
      commands.push(exports.data.toJSON());
    }

    const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.TEST_SERVER_ID
      ),
      {
        body: commands,
      }
    );

    console.log("Successfully registered application commands.");
  } catch (e) {
    console.error(e);
  }
})();
