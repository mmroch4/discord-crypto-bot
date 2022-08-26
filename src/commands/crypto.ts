import { SlashCommandBuilder } from "discord.js";
import { api } from "../lib/api";
import { Command } from "../types/Command";

const crypto: Command = {
  data: new SlashCommandBuilder()
    .setName("crypto")
    .setDescription("Gets cryptocurrency current value!")
    .addStringOption((option) =>
      option
        .setName("symbol")
        .setDescription("Cryptocurrency symbol. ex: btc, bnb, eth")
        .setRequired(true)
    ),
  execute: async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const option = interaction.options.get("symbol");

    const {
      data: { data: assets },
    } = await api.get("/assets");

    const crypto = assets.find(
      (asset: any) => asset.symbol === option?.value?.toString().toUpperCase()
    );

    if (!crypto) {
      await interaction.reply({
        ephemeral: true,
        content: `Could not find any asset with ${option?.value} as it's symbol`,
      });

      return;
    }

    await interaction.reply({
      content: `Rank: ${crypto.rank} | Cryptocurrency: ${
        crypto.name
      } | Price: ${Intl.NumberFormat("en-US", { currency: "USD" }).format(
        crypto.priceUsd
      )} USD`,
    });
  },
};

export default crypto;
