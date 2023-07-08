import chalk from "chalk";
import enquirer from "enquirer";
import * as fs from "fs";
import * as os from "os";
import { ConfigurationOptions, ConfigurationPrompt } from "./types";
import { exit } from "process";

export const CONFIG_FOLDER = `${os.homedir()}/.ducky`;
export const CONFIG_FILE_LOCATION = `${CONFIG_FOLDER}/config.json`;
export const LOG_FILE_LOCATION = `${CONFIG_FOLDER}/chat`;

export async function configureDucky() {
  const { prompt } = enquirer;
  console.log(chalk.green("Let's configure Ducky!"));
  console.log(
    chalk.white(
      "Ducky is your command line rubber duck, to help you come up with shell commands!",
    ),
  );
  console.log(chalk.white("Ducky is powered by OpenAI's Chat-GPT!"));
  // TODO: Make sure that at some point we allow users to configure where their config file is stored.
  console.log(chalk.white("Let's get you started"));
  const apiKey: ConfigurationPrompt = await prompt({
    type: "input",
    message: "What is your OpenAI API key?",
    name: "openAiApiKey",
  });
  console.log(chalk.green("Awesome!"));
  const logging: ConfigurationPrompt = await prompt({
    type: "input",
    message: "Do you want to log your chats (y/n)?",
    name: "logChat",
  });

  try {
    if (!fs.existsSync(CONFIG_FOLDER)) {
      fs.mkdirSync(CONFIG_FOLDER);
    }

    if (!fs.existsSync(LOG_FILE_LOCATION)) {
      fs.mkdirSync(LOG_FILE_LOCATION);
    }

    fs.writeFileSync(
      CONFIG_FILE_LOCATION,
      JSON.stringify({
        OPEN_AI_API_KEY: apiKey.openAiApiKey,
        LOG_CHAT: logging.logChat === "y" ? true : false,
      }),
      { flag: "w+", encoding: "utf-8" },
    );
  } catch (err) {
    console.error(err);
  }
}

export function loadDuckyConfig(): ConfigurationOptions {
  try {
    const configData = fs.readFileSync(CONFIG_FILE_LOCATION, "utf8");
    const config = JSON.parse(configData) as ConfigurationOptions;

    return config;
  } catch (err) {
    console.error(
      "There was an issue loading your config file %d. \nExiting...",
      err,
    );
    exit(1);
  }
}

process.on("SIGINT", () => {
  console.log("Thank you for using Ducky!");
  exit(0);
});
