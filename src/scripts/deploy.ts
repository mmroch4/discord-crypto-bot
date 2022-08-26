import { REST } from "@discordjs/rest";
import { Routes } from "discord.js";
import "dotenv/config";
import { importCommands } from "../commands";
import { BOT_CLIENT_ID, BOT_GUILD_ID, BOT_TOKEN } from "../config/env";

const rest = new REST({
  version: "10",
}).setToken(BOT_TOKEN);

const deployCommands = async () => {
  const commands = await importCommands();

  try {
    await rest.put(
      Routes.applicationGuildCommands(BOT_CLIENT_ID, BOT_GUILD_ID),
      {
        body: commands.map((command) => command.data.toJSON()),
      }
    );

    console.info("Successfully registered application commands.");
  } catch (err) {
    console.error(err);
  }
};

deployCommands();
