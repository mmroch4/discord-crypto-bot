import { readdirSync } from "fs";
import path from "path";
import { NODE_ENV } from "../config/env";
import { Command } from "../types/Command";

const extension = NODE_ENV === "prod" ? ".js" : ".ts";

export const importCommands = async () => {
  const commands: Command[] = [];

  const commandsPath = path.join(__dirname);
  const commandsFiles = readdirSync(commandsPath).filter(
    (file) =>
      file.endsWith(extension) && file.slice(0, -extension.length) !== "index"
  );

  for await (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file);

    try {
      const { default: command } = (await import(filePath)) as {
        default: Command;
      };

      commands.push(command);
    } catch (err) {
      console.error(err);
    }
  }

  return commands;
};
