import bot from "./src/bot.js";

const bootstrap = () => {
  try {
    bot.start();
    console.log("bot ishladi!");
  } catch (error) {
    console.error(error.message);
  }
};

bootstrap();
