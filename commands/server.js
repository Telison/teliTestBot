import { SlashCommandBuilder } from "@discordjs/builders";
import fetch from "node-fetch";

export const data = new SlashCommandBuilder()
  .setName("server")
  .setDescription("Shows guild language distribution for an EU server")
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("Name of server to check")
      .setRequired(true)
      .addChoices([
        ["Kadan", "Kadan"],
        ["Slen", "Slen"],
        ["Neria", "Neria"],
        ["Thirain", "Thirain"],
        ["Asta", "Asta"],
        ["Trixion", "Trixion"],
        ["Zinnervale", "Zinnervale"],
        ["Wei", "Wei"],
        ["Calvasus", "Calvasus"],
      ])
  );

export async function execute(interaction) {
  const response = await fetch(process.env.SERVER_STATS_API_URL);
  const servers = await response.json();

  const server = servers.find(
    (s) => s.name === interaction.options.getString("name")
  );

  if (server) {
    var reply = "``";

    reply += `Languages for ${server.name}\r\n\r\n`;

    for (const l of server.languages) {
      reply += `${l.name}${" ".repeat(
        22 - l.name.length - l.count.toString().length
      )}${l.count}\r\n`;
    }

    reply += "``";

    await interaction.reply(reply);
  }
}
