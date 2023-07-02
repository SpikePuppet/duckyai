import chalk from "chalk";
import { ConfigurationPrompt, UserChatPrompt } from "./types";
import enquirer from "enquirer";
import * as fs from "fs";
import * as os from "os";

export const CONFIG_FOLDER = `${os.homedir()}/.ducky`;
export const CONFIG_FILE_LOCATION: string = `${CONFIG_FOLDER}/config.json`;

export async function configure() {
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

  try {
    if (!fs.existsSync(CONFIG_FOLDER)) {
      fs.mkdirSync(CONFIG_FOLDER);
    }

    fs.writeFileSync(
      CONFIG_FILE_LOCATION,
      JSON.stringify({ OPEN_AI_API_KEY: apiKey.openAiApiKey }),
      { flag: "w+", encoding: "utf-8" },
    );
  } catch (err) {
    console.error(err);
  }
}
