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

    // userPrompts.push({
    //   role: "user",
    //   content: prompt,
    // });

    const userPrompt: OpenAIChatCompletionMessage = {
      role: "user",
      content: prompt,
    };

    const response = await openAiClient.createChatCompletion({
      model: "gpt-3.5-turbo",
      // messages: [...duckySystemPrompt, ...userPrompts],
      messages: [...duckySystemPrompt, userPrompt],
    });

    const command = response.data.choices[0].message?.content;
    if (command === undefined) {
      console.log(
        chalk.red(
          "I'm not quite sure how to help with that. Can you try rephrasing?",
        ),
      );
      continue;
    }

    console.log(command);
  }
}
