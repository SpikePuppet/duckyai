import { input } from "@inquirer/prompts";
import chalk from "chalk";
import {
  OpenAIChatCompletionMessage,
  createOpenAiClient,
  createDuckySystemPrompt,
} from "./openAiClient.ts";

export async function interactivePrompt() {
  console.log(chalk.green("Hi! I'm Ducky!"));
  console.log(
    chalk.white("I'm here to help you with your command line needs!"),
  );
  console.log(chalk.white("How can I help?"));

  const userPrompts: OpenAIChatCompletionMessage[] = [];

  // Example prompts for testing:
  //  1. "How would I view my current branch and it's previous commits in a nice tree format?"
  while (true) {
    const prompt = await input({ message: "" });

    if (prompt === "exit") {
      break;
    }

    if (prompt === "") {
      continue;
    }

    const openAiClient = createOpenAiClient();
    const duckySystemPrompt = createDuckySystemPrompt();

    userPrompts.push({
      role: "user",
      content: prompt,
    });

    const response = await openAiClient.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [...duckySystemPrompt, ...userPrompts],
    });

    console.log(response.data.choices[0].message);
  }
}
