import { ClientEvents } from "discord.js/typings";

export interface Event<T extends keyof ClientEvents> {
  name: T;
  once?: boolean;
  execute: (...args: ClientEvents[T]) => Promise<void>;
}
