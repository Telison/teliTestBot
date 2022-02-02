import { SlashCommandBuilder } from "@discordjs/builders";

export const data = new SlashCommandBuilder()
  .setName("user")
  .setDescription("Shows user info");

export async function execute(interaction) {
  await interaction.reply(
    `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
  );
}
