import { Client, Collection, GatewayIntentBits } from "discord.js";
import { Command } from "../types/Command";

export const client = new Client({
  intents: [GatewayIntentBits.Guilds],
}) as Client<boolean> & { commands: Collection<string, Command> };
