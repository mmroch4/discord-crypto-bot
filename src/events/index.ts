import { readdirSync } from "fs";
import path from "path";
import { NODE_ENV } from "../config/env";
import { Event } from "../types/Event";

const extension = NODE_ENV === "prod" ? ".js" : ".ts";

export const importEvents = async () => {
  const events: Event<any>[] = [];

  const eventsPath = path.join(__dirname);
  const eventsFiles = readdirSync(eventsPath).filter(
    (file) =>
      file.endsWith(extension) && file.slice(0, -extension.length) !== "index"
  );

  for await (const file of eventsFiles) {
    const filePath = path.join(eventsPath, file);

    try {
      const { default: event } = (await import(filePath)) as {
        default: Event<any>;
      };

      events.push(event);
    } catch (err) {
      console.error(err);
    }
  }

  return events;
};
