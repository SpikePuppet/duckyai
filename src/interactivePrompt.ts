import chalk from "chalk";
import {
  OpenAIChatCompletionMessage,
  createOpenAiClient,
  createDuckySystemPrompt,
} from "./openAiClient.js";
import enquirer from "enquirer";

export interface ChatPrompt {
  userQuestion: string;
}

export async function interactivePrompt() {
  const { prompt } = enquirer;
  console.log(chalk.green("Hi! I'm Ducky!"));
  console.log(
    chalk.white("I'm here to help you with your command line needs!"),
  );
  console.log(chalk.white("How can I help?"));

  const userPrompts: OpenAIChatCompletionMessage[] = [];

  while (true) {
    const input: ChatPrompt = await prompt({
      type: "input",
      name: "userQuestion",
      message: "How can I help?",
    });

    if (input.userQuestion === "exit") {
      break;
    }

    if (input.userQuestion === "") {
      continue;
    }

    const openAiClient = createOpenAiClient();
    const duckySystemPrompt = createDuckySystemPrompt();

    userPrompts.push({
      role: "user",
      content: input.userQuestion,
    });

    const response = await openAiClient.createChatCompletion({
      model: "gpt-3.5-turbo-0613",
      messages: [...duckySystemPrompt, ...userPrompts],
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
