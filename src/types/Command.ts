import { Interaction, SlashCommandBuilder } from "discord.js/typings";

export interface Command {
  data:
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  execute: (interaction: Interaction) => Promise<void>;
}
