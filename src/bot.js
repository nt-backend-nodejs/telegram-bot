import { Bot } from "grammy";
import { config } from "./config.js";
import { writeFile, readFile } from "node:fs/promises";
import { join } from "node:path";

const bot = new Bot(config.token);

const dbFilePath = join(import.meta.dirname, "db.json");
const readDb = async () => {
  try {
    const data = await readFile(dbFilePath, "utf-8");
    const users = await JSON.parse(data);
    return users;
  } catch (error) {
    console.error(error);
  }
};

const writeDb = async (users) => {
  try {
    const json = await JSON.stringify(users);
    await writeFile(dbFilePath, json);
  } catch (error) {}
};

bot.command("start", async (ctx) => {
  const users = await readDb();
  const user = ctx.message.from;
  users.push(user);
  await writeDb(users);
  ctx.reply("Welcome! Up and running.");
});

// bot.on("message", (ctx) => ctx.reply("Got another message!"));

bot.hears("send", async (ctx) => {
  // `reply` is an alias for `sendMessage` in the same chat (see next section).
  const users = await readDb();
  users.forEach(async (user) => {
    await bot.api.sendMessage(user.id, "Hi!");
  });

  await ctx.reply("pong", {
    // `reply_parameters` specifies the actual reply feature.
    reply_parameters: { message_id: ctx.msg.message_id },
  });
});

export default bot;
