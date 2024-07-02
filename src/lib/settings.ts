import { asyncable } from "svelte-asyncable";
import { storage } from "wxt/storage";

const apiKey = asyncable(
  async () => {
    return await storage.getItem<string>("local:apiKey");
  },
  async (value: string) => {
    await storage.setItem("local:apiKey", value);
  }
);

export { apiKey };
