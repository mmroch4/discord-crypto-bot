import { Collection } from "discord.js";
import "dotenv/config";
import { importCommands } from "./commands";
import { client } from "./config/client";
import { BOT_TOKEN } from "./config/env";
import { importEvents } from "./events";

client.commands = new Collection();

(async () => {
  const commands = await importCommands();

  for (const command of commands) {
    client.commands.set(command.data.name, command);
  }
})();

(async () => {
  const events = await importEvents();

  for (const event of events) {
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
})();

client.login(BOT_TOKEN);
