import { SlashCommandBuilder } from "@discordjs/builders";
import fetch from "node-fetch";

export const data = new SlashCommandBuilder()
  .setName("cat")
  .setDescription("Random cat");

export async function execute(interaction) {
  await interaction.deferReply();
  const response = await fetch("https://aws.random.cat/meow");
  const { file } = await response.json();
  await interaction.editReply({ files: [file] });
}
