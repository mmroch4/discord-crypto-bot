import { client } from "../config/client";
import { Event } from "../types/Event";

const ready: Event<"interactionCreate"> = {
  name: "interactionCreate",

  execute: async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(err);

      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};

export default ready;
