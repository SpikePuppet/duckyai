import "dotenv/config";
import { input } from "@inquirer/prompts";
import { createDuckySystemPrompt, createOpenAiClient } from "./openAiClient.ts";
import chalk from "chalk";

console.log(chalk.green("Hi! I'm Ducky!"));
console.log(chalk.white("I'm here to help you with your command line needs!"));
console.log(chalk.white("How can I help?"));

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

  const response = await openAiClient.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      ...duckySystemPrompt,
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  console.log(response.data.choices[0].message);
}
