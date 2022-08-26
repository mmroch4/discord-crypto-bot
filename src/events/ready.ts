import { Event } from "../types/Event";

const ready: Event<"ready"> = {
  name: "ready",
  once: true,

  execute: async (client) => {
    console.info(`Ready! Logged in as ${client.user.tag}`);
  },
};

export default ready;
